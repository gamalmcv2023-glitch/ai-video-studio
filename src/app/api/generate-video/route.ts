import { createGateway, experimental_generateVideo as generateVideo } from "ai";

export const maxDuration = 300;

const allowedDurations = new Set([15, 20, 25, 30]);
const allowedAspectRatios = new Set(["16:9", "9:16", "1:1"]);

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
    const duration = typeof body.duration === "number" ? body.duration : 15;
    const aspectRatio = typeof body.aspectRatio === "string" ? body.aspectRatio : "16:9";

    if (!prompt) {
      return Response.json({ error: "أدخل وصفًا للمشهد أولًا." }, { status: 400 });
    }

    if (!allowedDurations.has(duration) || !allowedAspectRatios.has(aspectRatio)) {
      return Response.json({ error: "إعدادات الفيديو غير مدعومة." }, { status: 400 });
    }

    const gateway = createGateway({ apiKey: process.env.AI_GATEWAY_API_KEY });
    const result = await generateVideo({
      model: gateway.video("bytedance/seedance-2.5"),
      prompt,
      aspectRatio,
      resolution: aspectRatio === "16:9" ? "1280x720" : aspectRatio === "9:16" ? "720x1280" : "720x720",
      duration,
    });

    const video = result.videos[0];
    if (!video) {
      throw new Error("لم يُرجع مزود الفيديو أي ملف فيديو.");
    }

    return Response.json({
      video: {
        data: Buffer.from(video.uint8Array).toString("base64"),
        mediaType: video.mediaType,
      },
    });
  } catch (error) {
    console.error("Video generation failed", error);
    const message = error instanceof Error ? error.message : "حدث خطأ غير متوقع أثناء إنشاء الفيديو.";
    return Response.json({ error: message }, { status: 502 });
  }
}