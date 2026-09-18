import { createGateway, experimental_generateVideo as generateVideo } from "ai";
import { getVideoModel } from "@/lib/video-models";

export const maxDuration = 300;

const allowedAspectRatios = new Set(["16:9", "9:16", "1:1"]);
const allowedModes = new Set(["text", "image"]);

export async function POST(request: Request) {
  if (!process.env.AI_GATEWAY_API_KEY) {
    return Response.json({ error: "الخدمة جاهزة للاستخدام." }, { status: 500 });
  }

  try {
    const body = await request.json();
    const modelId = typeof body.model === "string" ? body.model : "";
    const mode = typeof body.mode === "string" ? body.mode : "";
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    const duration = typeof body.duration === "number" ? body.duration : NaN;
    const aspectRatio = typeof body.aspectRatio === "string" ? body.aspectRatio : "";
    const audio = typeof body.audio === "boolean" ? body.audio : false;
    const model = getVideoModel(modelId);

    if (!model || !allowedModes.has(mode) || !model.modes.includes(mode as "text" | "image")) {
      return Response.json({ error: "النموذج أو طريقة التوليد غير مدعومة." }, { status: 400 });
    }
    if (!prompt) {
      return Response.json({ error: "أدخل وصفًا للمشهد أولًا." }, { status: 400 });
    }

    if (!model.durations.includes(duration) || !allowedAspectRatios.has(aspectRatio)) {
      return Response.json({ error: "إعدادات الفيديو غير مدعومة لهذا النموذج." }, { status: 400 });
    }

    if (audio && !model.audio) {
      return Response.json({ error: "إعدادات الفيديو غير مدعومة." }, { status: 400 });
    }

    const gateway = createGateway({ apiKey: process.env.AI_GATEWAY_API_KEY });
    const result = await generateVideo({
      model: gateway.video(model.id),
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
  } catch {
    console.error("Video generation failed.");
    return Response.json({ error: "تعذر إنشاء الفيديو حاليًا." }, { status: 502 });
  }
}