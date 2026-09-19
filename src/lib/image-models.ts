export type ImageModel = {
  id: string;
  name: string;
  provider: string;
  logo: string;
  supportsReference: boolean;
  supportsCount: boolean;
  aspectRatios: string[];
  sizes: string[];
  quality?: string[];
};

export const IMAGE_MODELS: ImageModel[] = [
  { id: "openai/gpt-image-2.5-sunburst", name: "GPT Image 2.5", provider: "OpenAI", logo: "G", supportsReference: true, supportsCount: true, aspectRatios: ["1:1", "16:9", "9:16"], sizes: ["1024x1024", "1536x1024", "1024x1536"], quality: ["low", "medium", "high"] },
  { id: "openai/gpt-image-2", name: "GPT Image 2", provider: "OpenAI", logo: "G", supportsReference: true, supportsCount: true, aspectRatios: ["1:1", "16:9", "9:16"], sizes: ["1024x1024", "1536x1024", "1024x1536"], quality: ["low", "medium", "high"] },
  { id: "google/gemini-3-pro-image", name: "Nano Banana Pro", provider: "Google", logo: "N", supportsReference: true, supportsCount: false, aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4"], sizes: ["1K", "2K", "4K"] },
  { id: "bfl/flux-2-max", name: "FLUX.2 Max", provider: "Black Forest Labs", logo: "F", supportsReference: true, supportsCount: true, aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4"], sizes: ["1024x1024", "1536x1024", "1024x1536"] },
  { id: "bfl/flux-kontext-pro", name: "FLUX.1 Kontext Pro", provider: "Black Forest Labs", logo: "F", supportsReference: true, supportsCount: false, aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4"], sizes: ["1024x1024", "1536x1024", "1024x1536"] },
];

export function getImageModel(id: string) {
  return IMAGE_MODELS.find((model) => model.id === id);
}