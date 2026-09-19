import { createGateway, generateImage } from "ai";
import { getImageModel } from "@/lib/image-models";

export const maxDuration = 300;

const allowedCounts = new Set([1, 2, 3, 4]);

export async function POST(request: Request) {
  if (!process.env.AI_GATEWAY_API_KEY) {
    return Response.json({ error: "الخدمة جاهزة للاستخدام." }, { status: 500 });
  }

  try {
    const body = await request.json();
    const modelId = typeof body.model === "string" ? body.model : "";
    const promptText = typeof body.prompt === "string" ? body.prompt.trim() : "";
    const aspectRatio = typeof body.aspectRatio === "string" ? body.aspectRatio : "";
    const size = typeof body.size === "string" ? body.size : "";
    const quality = typeof body.quality === "string" ? body.quality : "";
    const count = typeof body.count === "number" ? body.count : 1;
    const referenceImage = typeof body.referenceImage === "string" ? body.referenceImage : "";
    const model = getImageModel(modelId);

    if (!model || !promptText) return Response.json({ error: "اختر نموذجًا واكتب وصف الصورة أولًا." }, { status: 400 });
    if (!model.aspectRatios.includes(aspectRatio) || !model.sizes.includes(size)) return Response.json({ error: "إعدادات الصورة غير مدعومة لهذا النموذج." }, { status: 400 });
    if ((!model.supportsCount && count !== 1) || !allowedCounts.has(count)) return Response.json({ error: "عدد الصور غير مدعوم لهذا النموذج." }, { status: 400 });
    if (quality && !model.quality?.includes(quality)) return Response.json({ error: "الجودة غير مدعومة لهذا النموذج." }, { status: 400 });
    if (referenceImage && (!model.supportsReference || !referenceImage.startsWith("data:image/"))) return Response.json({ error: "الصورة المرجعية غير مدعومة لهذا النموذج." }, { status: 400 });

    const gateway = createGateway({ apiKey: process.env.AI_GATEWAY_API_KEY });
    const prompt = referenceImage ? { text: promptText, images: [referenceImage] } : promptText;
    let providerOptions: Record<string, Record<string, string>> | undefined;
    if (quality) providerOptions = { openai: { quality } };
    if (size.match(/^\dK$/)) providerOptions = { google: { imageSize: size } };
    const result = await generateImage({ model: gateway.image(model.id), prompt, n: count, aspectRatio: aspectRatio as `${number}:${number}`, ...(size.includes("x") ? { size: size as `${number}x${number}` } : {}), ...(providerOptions ? { providerOptions } : {}) });

    return Response.json({ images: result.images.map((image) => ({ data: Buffer.from(image.uint8Array).toString("base64"), mediaType: image.mediaType })) });
  } catch {
    console.error("Image generation failed.");
    return Response.json({ error: "تعذر إنشاء الصورة حاليًا." }, { status: 502 });
  }
}