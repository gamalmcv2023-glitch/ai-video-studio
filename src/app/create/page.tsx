"use client";

import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { VIDEO_MODELS } from "@/lib/video-models";

const ratioOptions = [
  { value: "16:9", hint: "سينمائي" },
  { value: "9:16", hint: "عمودي" },
  { value: "1:1", hint: "مربع" },
];

const providerNames: Record<string, string> = {
  ByteDance: "بايت دانس",
  Google: "جوجل",
  "Kling AI": "كلينج",
  "Alibaba Cloud": "علي بابا كلاود",
  xAI: "إكس إيه آي",
  MiniMax: "ميني ماكس",
};

function getProviderName(provider: string) {
  return providerNames[provider] ?? provider;
}

type HistoryItem = { id: number; prompt: string; url: string; createdAt: string };

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState(VIDEO_MODELS[0]);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoMode, setVideoMode] = useState<"text" | "image">("text");
  const [duration, setDuration] = useState(VIDEO_MODELS[0].durations[0]);
  const [audio, setAudio] = useState(Boolean(VIDEO_MODELS[0].audio));
  const [ratio, setRatio] = useState("16:9");
  const [imagePreview, setImagePreview] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "complete" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const generationModes: Array<"text" | "image"> = ["text", "image"];

  function selectModel(modelId: string) {
    const model = VIDEO_MODELS.find((item) => item.id === modelId) ?? VIDEO_MODELS[0];
    setSelectedModel(model);
    setVideoMode(model.modes[0]);
    setDuration(model.durations[0]);
    setAudio(Boolean(model.audio));
    setImagePreview("");
    setModelMenuOpen(false);
  }

  useEffect(() => () => { if (imagePreview) URL.revokeObjectURL(imagePreview); }, [imagePreview]);

  useEffect(() => {
    if (!modelMenuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setModelMenuOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [modelMenuOpen]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    if (!prompt.trim()) return;
    const modelName = selectedModel.name;
    setStatus("processing");
    setErrorMessage("");
    setVideoUrl("");
    try {
      const response = await fetch("/api/generate-video", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: selectedModel.id, mode: videoMode, prompt: prompt.trim(), duration, aspectRatio: ratio, audio }) });
      const result = await response.json();
      if (!response.ok) throw new Error(typeof result.error === "string" ? result.error : "تعذر إنشاء الفيديو.");
      const url = `data:${result.video.mediaType};base64,${result.video.data}`;
      setVideoUrl(url);
      setHistory((current) => [{ id: Date.now(), prompt: prompt.trim(), url, createdAt: `${new Date().toLocaleTimeString("ar", { hour: "2-digit", minute: "2-digit" })} · ${modelName}` }, ...current]);
      setStatus("complete");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "تعذر إنشاء الفيديو.");
      setStatus("error");
    }
  }

  return (
    <main className="create-shell">
      <div className="create-frame">
        <header className="create-header"><Link href="/" className="brand" aria-label="العودة إلى الرئيسية"><span className="brand-mark">ش</span><span><strong>منصة الشرقاوي</strong><small>استوديو الإبداع الذكي</small></span></Link><span className="header-note">VIDEO STUDIO</span><button type="button" className="menu-button" aria-label="فتح القائمة" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>{menuOpen && <nav className="mobile-menu" aria-label="قائمة الاستوديو"><Link href="/">الرئيسية</Link><Link href="/create">إنشاء فيديو</Link><Link href="/script-studio">Script Studio</Link></nav>}</header>

        <section className="create-hero"><p className="eyebrow">Creator suite · 01</p><h1>اصنع المشهد الذي لا يُنسى.</h1><p>حوّل رؤيتك إلى فيديو سينمائي بإيقاع وهوية بصرية واضحة.</p></section>

        <section className="create-card model-creator" aria-label="توليد الفيديو">
          <div className="section-bar"><div><span className="eyebrow">استوديو الإبداع</span><h2>توليد الفيديو</h2></div><span className="step-count">01 / 01</span></div>
          <div className="field-block"><label>طريقة التوليد</label><div className="choice-list mode-list">{generationModes.map((mode) => { const isSupported = selectedModel.modes.includes(mode); return <button key={mode} type="button" disabled={!isSupported} aria-disabled={!isSupported} onClick={() => setVideoMode(mode)} className={`${videoMode === mode ? "choice active" : "choice"}${!isSupported ? " unsupported" : ""}`}>{mode === "text" ? "✍️ وصف إلى فيديو" : "🖼️ صورة إلى فيديو"}<span>{isSupported ? (mode === "text" ? "اكتب المشهد" : "حرّك صورة") : "غير متاح لهذا النموذج"}</span></button>; })}</div></div>
          <div className="field-block model-field"><label id="model-label">اختيار النموذج</label><button type="button" className={`model-trigger ${modelMenuOpen ? "open" : ""}`} aria-labelledby="model-label" aria-haspopup="listbox" aria-expanded={modelMenuOpen} aria-controls="model-options" onClick={() => setModelMenuOpen((open) => !open)}><span className="model-logo">{selectedModel.logo}</span><span className="model-trigger-copy"><strong>{selectedModel.name}</strong><small>{getProviderName(selectedModel.provider)}</small></span><span className="model-chevron" aria-hidden="true">⌄</span></button>{modelMenuOpen && <div id="model-options" className="model-options" role="listbox" aria-label="نماذج الفيديو">{VIDEO_MODELS.map((model) => <button key={model.id} type="button" role="option" aria-selected={selectedModel.id === model.id} onClick={() => selectModel(model.id)} className={`model-option ${selectedModel.id === model.id ? "active" : ""}`}><span className="model-logo">{model.logo}</span><span className="model-card-copy"><strong>{model.name}</strong><small>{getProviderName(model.provider)}</small><span className="model-option-capabilities">{model.modes.map((mode) => mode === "text" ? "وصف" : "صورة").join(" · ")}{model.audio ? " · صوت" : ""}</span></span><span className="model-option-mark" aria-hidden="true">{selectedModel.id === model.id ? "✓" : ""}</span></button>)}</div>}</div>
          <div className="field-block"><label htmlFor="duration">مدة الفيديو</label><select id="duration" value={duration} onChange={(event) => setDuration(Number(event.target.value))}>{selectedModel.durations.map((value) => <option key={value} value={value}>{value} ثانية</option>)}</select></div>
          {selectedModel.audio && <div className="audio-option"><label><input type="checkbox" checked={audio} onChange={(event) => setAudio(event.target.checked)} /> <span>🔊 إنشاء صوت</span></label><small>متاح لهذا النموذج</small></div>}
          <div className="field-block"><label htmlFor="prompt">وصف المشهد</label><textarea id="prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="مثال: لقطة سينمائية لمدينة مستقبلية بعد المطر، انعكاسات نيون، حركة كاميرا بطيئة..." /></div>
          {videoMode === "image" && selectedModel.modes.includes("image") && <div className="field-block"><label>الصورة المرجعية</label><label className="upload-box"><span className="upload-icon">＋</span><span><strong>{imagePreview ? "تم اختيار الصورة" : "أضف صورة مرجعية"}</strong><small>{imagePreview ? "اضغط لاختيار صورة أخرى" : "PNG أو JPG · حتى 10MB"}</small></span>{imagePreview && <Image src={imagePreview} alt="معاينة الصورة" width={54} height={42} unoptimized />}<input type="file" accept="image/png,image/jpeg" onChange={handleImageChange} /></label><p className="field-hint">ستُستخدم الصورة كمرجع عند اتصال مزود الفيديو.</p></div>}
          <div className="field-block"><label>نسبة العرض</label><div className="ratio-list">{ratioOptions.map((option) => <button type="button" key={option.value} onClick={() => setRatio(option.value)} className={ratio === option.value ? "ratio active" : "ratio"}><strong>{option.value}</strong><span>{option.hint}</span></button>)}</div></div>
          <button type="button" onClick={handleSubmit} disabled={status === "processing" || !prompt.trim()} className="generate-button">{status === "processing" ? "جارٍ التوليد..." : status === "complete" ? "توليد فيديو جديد" : "🎬 إنشاء الفيديو"}<span>✦</span></button>
          {status === "processing" && <p className="status-message processing">يعمل {selectedModel.name} على بناء المشهد. قد يستغرق ذلك عدة دقائق.</p>}
          {status === "error" && <p role="alert" className="status-message error">{errorMessage}</p>}
        </section>

        <section className="result-card" aria-live="polite"><div className="section-bar"><div><span className="eyebrow">المخرجات</span><h2>نتيجة الفيديو</h2></div><span className={`result-status ${status}`}>{status === "processing" ? "جارٍ التوليد" : status === "complete" ? "جاهز" : "بانتظار الوصف"}</span></div><div className="video-frame">{videoUrl ? <video src={videoUrl} controls playsInline /> : <div className="video-placeholder"><span>✧</span><p>{status === "processing" ? "نجهّز المشهد الآن" : "سيظهر الفيديو هنا"}</p><small>{prompt || "اكتب وصفًا لبدء التوليد"}</small></div>}</div>{videoUrl && <div className="result-actions"><a href={videoUrl} download="generated-video.mp4" className="small-button">تنزيل ↧</a><a href={videoUrl} target="_blank" rel="noreferrer" className="small-button quiet">معاينة ↗</a></div>}</section>

        <section className="history-card"><div className="section-bar"><div><span className="eyebrow">History</span><h2>آخر الفيديوهات</h2></div><span className="step-count">{history.length} نتائج</span></div>{history.length ? <div className="history-list">{history.map((item) => <button type="button" key={item.id} onClick={() => setVideoUrl(item.url)} className="history-item"><span className="history-thumb"><video src={item.url} muted /></span><span><strong>{item.prompt}</strong><small>{item.createdAt}</small></span><span>↗</span></button>)}</div> : <p className="empty-history">ستظهر الفيديوهات التي تنشئها هنا.</p>}</section>

        <footer className="create-footer"><strong>منصة الشرقاوي</strong><span>صناعة أفكار تستحق أن تُرى</span><Link href="/">العودة للرئيسية ↑</Link></footer>
      </div>
    </main>
  );
}
