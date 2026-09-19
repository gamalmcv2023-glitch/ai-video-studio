"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { IMAGE_MODELS, ImageModel } from "@/lib/image-models";

const providerNames: Record<string, string> = { OpenAI: "OpenAI", Google: "Google", "Black Forest Labs": "Black Forest Labs" };

export default function ImageCreatePage() {
  const [selectedModel, setSelectedModel] = useState<ImageModel>(IMAGE_MODELS[0]);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState(IMAGE_MODELS[0].aspectRatios[0]);
  const [size, setSize] = useState(IMAGE_MODELS[0].sizes[0]);
  const [quality, setQuality] = useState(IMAGE_MODELS[0].quality?.[1] ?? "");
  const [count, setCount] = useState(1);
  const [referenceImage, setReferenceImage] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "complete" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!modelMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setModelMenuOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [modelMenuOpen]);

  function selectModel(model: ImageModel) {
    setSelectedModel(model);
    setAspectRatio(model.aspectRatios[0]);
    setSize(model.sizes[0]);
    setQuality(model.quality?.[1] ?? "");
    setCount(1);
    setReferenceImage("");
    setModelMenuOpen(false);
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => setReferenceImage(typeof reader.result === "string" ? reader.result : ""));
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    if (!prompt.trim()) return;
    setStatus("processing");
    setErrorMessage("");
    setImages([]);
    try {
      const response = await fetch("/api/generate-image", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: selectedModel.id, prompt: prompt.trim(), aspectRatio, size, quality, count, referenceImage }) });
      const result = await response.json();
      if (!response.ok) throw new Error(typeof result.error === "string" ? result.error : "تعذر إنشاء الصورة.");
      setImages(result.images.map((image: { data: string; mediaType: string }) => `data:${image.mediaType};base64,${image.data}`));
      setStatus("complete");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "تعذر إنشاء الصورة.");
      setStatus("error");
    }
  }

  return (
    <main className="create-shell image-create-shell" dir="rtl">
      <div className="create-frame">
        <header className="create-header"><Link href="/" className="brand" aria-label="العودة إلى الرئيسية"><span className="brand-mark">ش</span><span><strong>منصة الشرقاوي</strong><small>استوديو الإبداع الذكي</small></span></Link><span className="header-note">IMAGE STUDIO</span><Link href="/create" className="header-link">توليد الفيديو ↗</Link></header>
        <section className="create-hero"><p className="eyebrow">Image suite · 02</p><h1>صمّم الصورة التي تُرى.</h1><p>حوّل فكرتك إلى صورة ذات حضور بصري واضح وتفاصيل محسوبة.</p></section>
        <section className="create-card image-creator" aria-label="توليد الصور">
          <div className="section-bar"><div><span className="eyebrow">استوديو الإبداع</span><h2>🖼️ توليد الصور</h2></div><span className="step-count">01 / 01</span></div>
          <div className="field-block model-field"><label id="image-model-label">اختيار النموذج</label><button type="button" className={`model-trigger ${modelMenuOpen ? "open" : ""}`} aria-labelledby="image-model-label" aria-haspopup="listbox" aria-expanded={modelMenuOpen} aria-controls="image-model-options" onClick={() => setModelMenuOpen((open) => !open)}><span className="model-logo">{selectedModel.logo}</span><span className="model-trigger-copy"><strong>{selectedModel.name}</strong><small>{providerNames[selectedModel.provider]}</small></span><span className="model-chevron" aria-hidden="true">⌄</span></button>{modelMenuOpen && <div id="image-model-options" className="model-options" role="listbox" aria-label="نماذج الصور">{IMAGE_MODELS.map((model) => <button key={model.id} type="button" role="option" aria-selected={selectedModel.id === model.id} onClick={() => selectModel(model)} className={`model-option ${selectedModel.id === model.id ? "active" : ""}`}><span className="model-logo">{model.logo}</span><span className="model-card-copy"><strong>{model.name}</strong><small>{providerNames[model.provider]}</small><span className="model-option-capabilities">{model.supportsReference ? "مرجع" : "نص فقط"} · {model.sizes.join(" · ")}</span></span><span className="model-option-mark" aria-hidden="true">{selectedModel.id === model.id ? "✓" : ""}</span></button>)}</div>}</div>
          {selectedModel.supportsReference && <div className="field-block"><label>🖼️ الصورة المرجعية</label><label className="upload-box"><span className="upload-icon">＋</span><span><strong>{referenceImage ? "تم اختيار الصورة" : "أضف صورة مرجعية"}</strong><small>{referenceImage ? "اضغط لاختيار صورة أخرى" : "PNG أو JPG · حتى 10MB"}</small></span>{referenceImage && <Image src={referenceImage} alt="معاينة الصورة المرجعية" width={54} height={42} unoptimized />}<input type="file" accept="image/png,image/jpeg" onChange={handleImageChange} /></label></div>}
          <div className="field-block"><label htmlFor="image-prompt">✍️ وصف الصورة</label><textarea id="image-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="مثال: بورتريه سينمائي بإضاءة ذهبية وخلفية داكنة، تفاصيل دقيقة..." /></div>
          <div className="field-block"><label>نسبة الصورة</label><div className="ratio-list">{selectedModel.aspectRatios.map((ratio) => <button type="button" key={ratio} onClick={() => setAspectRatio(ratio)} className={aspectRatio === ratio ? "ratio active" : "ratio"}><strong>{ratio}</strong><span>{ratio === "1:1" ? "مربع" : ratio === "16:9" ? "أفقي" : ratio === "9:16" ? "عمودي" : "قياسي"}</span></button>)}</div></div>
          <div className="field-block"><label htmlFor="image-size">الجودة / الدقة</label><select id="image-size" value={size} onChange={(event) => setSize(event.target.value)}>{selectedModel.sizes.map((value) => <option key={value} value={value}>{value}</option>)}</select></div>
          {selectedModel.quality && <div className="field-block"><label htmlFor="image-quality">جودة التوليد</label><select id="image-quality" value={quality} onChange={(event) => setQuality(event.target.value)}>{selectedModel.quality.map((value) => <option key={value} value={value}>{value === "low" ? "اقتصادية" : value === "medium" ? "متوازنة" : "عالية"}</option>)}</select></div>}
          {selectedModel.supportsCount && <div className="field-block"><label htmlFor="image-count">عدد الصور</label><select id="image-count" value={count} onChange={(event) => setCount(Number(event.target.value))}>{[1, 2, 3, 4].map((value) => <option key={value} value={value}>{value} {value === 1 ? "صورة" : "صور"}</option>)}</select></div>}
          <button type="button" onClick={handleSubmit} disabled={status === "processing" || !prompt.trim()} className="generate-button">{status === "processing" ? "جارٍ التوليد..." : status === "complete" ? "إنشاء صورة جديدة" : "🎨 إنشاء الصورة"}<span>✦</span></button>
          {status === "processing" && <p className="status-message processing">يعمل {selectedModel.name} على صياغة الصورة. قد يستغرق ذلك لحظات.</p>}
          {status === "error" && <p role="alert" className="status-message error">{errorMessage}</p>}
        </section>
        <section className="result-card image-result-card" aria-live="polite"><div className="section-bar"><div><span className="eyebrow">المخرجات</span><h2>نتيجة الصورة</h2></div><span className={`result-status ${status === "complete" ? "ready" : status}`}>{status === "processing" ? "جارٍ التوليد" : status === "complete" ? "جاهزة" : "بانتظار الوصف"}</span></div><div className={`image-result ${images.length ? "has-images" : ""}`}>{images.length ? images.map((image, index) => <a key={image} href={image} target="_blank" rel="noreferrer"><Image src={image} alt={`الصورة الناتجة ${index + 1}`} width={1024} height={1024} unoptimized /></a>) : <div className="image-placeholder"><span>✧</span><p>{status === "processing" ? "نجهّز الصورة الآن" : "ستظهر الصورة هنا"}</p><small>{prompt || "اكتب وصفًا لبدء التوليد"}</small></div>}</div>{images.length > 0 && <div className="result-actions">{images.map((image, index) => <a key={image} href={image} download={`generated-image-${index + 1}.png`} className="small-button">تنزيل {index + 1} ↧</a>)}</div>}</section>
        <footer className="create-footer"><strong>منصة الشرقاوي</strong><span>صناعة أفكار تستحق أن تُرى</span><Link href="/">العودة للرئيسية ↑</Link></footer>
      </div>
    </main>
  );
}