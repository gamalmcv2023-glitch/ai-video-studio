import { createGateway, experimental_generateVideo as generateVideo } from "ai";

export const maxDuration = 600;

export async function POST(request: Request) {
  if (!process.env.AI_GATEWAY_API_KEY) {
    return Response.json(
      { error: "AI_GATEWAY_API_KEY غير مضبوط على الخادم." },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return Response.json({ error: "أدخل وصفًا للمشهد أولًا." }, { status: 400 });
    }

    const gateway = createGateway({ apiKey: process.env.AI_GATEWAY_API_KEY });
    const { video } = await generateVideo({
      model: gateway.video("bytedance/seedance-2.5"),
      prompt,
      aspectRatio: "16:9",
      duration: 10,
    });

    return Response.json({
      video: {
        data: video.base64,
        mediaType: video.mediaType,
      },
    });
  } catch (error) {
    console.error("Video generation failed", error);
    const message = error instanceof Error ? error.message : "تعذر إنشاء الفيديو.";
    return Response.json({ error: message }, { status: 502 });
  }
}