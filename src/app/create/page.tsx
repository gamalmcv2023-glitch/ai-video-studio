"use client";

import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

const videoTypeOptions = ["Text to Video", "Image to Video"];
const durationOptions = [15, 20, 25, 30];
const ratioOptions = [
  { value: "16:9", hint: "سينمائي" },
  { value: "9:16", hint: "عمودي" },
  { value: "1:1", hint: "مربع" },
];

type HistoryItem = { id: number; prompt: string; url: string; createdAt: string };

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [videoType, setVideoType] = useState(videoTypeOptions[0]);
  const [duration, setDuration] = useState(15);
  const [ratio, setRatio] = useState("16:9");
  const [imagePreview, setImagePreview] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "complete" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => () => { if (imagePreview) URL.revokeObjectURL(imagePreview); }, [imagePreview]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    if (!prompt.trim() || videoType === "Image to Video") return;
    setStatus("processing");
    setErrorMessage("");
    setVideoUrl("");
    try {
      const response = await fetch("/api/generate-video", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: prompt.trim(), duration, aspectRatio: ratio, videoType }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "تعذر إنشاء الفيديو.");
      const url = `data:${result.video.mediaType};base64,${result.video.data}`;
      setVideoUrl(url);
      setHistory((current) => [{ id: Date.now(), prompt: prompt.trim(), url, createdAt: new Date().toLocaleTimeString("ar", { hour: "2-digit", minute: "2-digit" }) }, ...current]);
      setStatus("complete");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "تعذر إنشاء الفيديو.");
      setStatus("error");
    }
  }

  return (
    <main className="create-shell">
      <div className="create-frame">
        <header className="create-header"><Link href="/" className="brand" aria-label="العودة إلى الرئيسية"><span className="brand-mark">ش</span><span><strong>منصة الشرقاوي</strong><small>استوديو الإبداع الذكي</small></span></Link><span className="header-note">SEEDANCE 2.5</span><Link href="/" className="header-link">الرئيسية ↗</Link></header>

        <section className="create-hero"><p className="eyebrow">Creator suite · 01</p><h1>اصنع المشهد الذي لا يُنسى.</h1><p>حوّل رؤيتك إلى فيديو سينمائي بإيقاع وهوية بصرية واضحة.</p></section>

        <section className="create-card" aria-label="إعدادات إنشاء الفيديو">
          <div className="section-bar"><div><span className="eyebrow">Create Video</span><h2>صِف رؤيتك</h2></div><span className="step-count">01 / 04</span></div>
          <div className="field-block"><label>نوع الفيديو</label><div className="choice-list">{videoTypeOptions.map((option) => <button key={option} type="button" onClick={() => setVideoType(option)} className={videoType === option ? "choice active" : "choice"}>{option}<span>{option === "Text to Video" ? "اكتب فكرة" : "قريبًا"}</span></button>)}</div></div>
          <div className="field-block"><label htmlFor="prompt">Prompt</label><textarea id="prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="مثال: لقطة سينمائية لمدينة مستقبلية بعد المطر، انعكاسات نيون، حركة كاميرا بطيئة..." /></div>
          <div className="field-block"><label htmlFor="model">Model</label><select id="model" defaultValue="Seedance 2.5"><option>Seedance 2.5</option></select><small className="field-hint">Vercel AI Gateway · Text to Video</small></div>
          <div className="field-block"><label htmlFor="duration">Duration</label><select id="duration" value={duration} onChange={(event) => setDuration(Number(event.target.value))}>{durationOptions.map((value) => <option key={value} value={value}>{value} ثانية</option>)}</select></div>
          <div className="field-block"><label>Aspect Ratio</label><div className="ratio-list">{ratioOptions.map((option) => <button type="button" key={option.value} onClick={() => setRatio(option.value)} className={ratio === option.value ? "ratio active" : "ratio"}><strong>{option.value}</strong><span>{option.hint}</span></button>)}</div></div>
          <div className="field-block"><label>Upload Image <small>(اختياري لـ Image to Video)</small></label><label className={`upload-box ${videoType === "Text to Video" ? "disabled" : ""}`}><span className="upload-icon">＋</span><span><strong>{imagePreview ? "تم اختيار الصورة" : "أضف صورة مرجعية"}</strong><small>{imagePreview ? "اضغط لاختيار صورة أخرى" : "PNG أو JPG · حتى 10MB"}</small></span>{imagePreview && <Image src={imagePreview} alt="معاينة الصورة" width={54} height={42} unoptimized />}<input type="file" accept="image/png,image/jpeg" onChange={handleImageChange} disabled={videoType === "Text to Video"} /></label>{videoType === "Image to Video" && <p className="field-hint">Image to Video سيُفعّل في مرحلة لاحقة. التوليد الحالي يدعم Text to Video فقط.</p>}</div>
          <button type="button" onClick={handleSubmit} disabled={status === "processing" || !prompt.trim() || videoType === "Image to Video"} className="generate-button">{status === "processing" ? "جارٍ التوليد..." : status === "complete" ? "توليد فيديو جديد" : "Generate Video"}<span>✦</span></button>
          {status === "processing" && <p className="status-message processing">يعمل Seedance 2.5 على بناء المشهد. قد يستغرق ذلك عدة دقائق.</p>}
          {status === "error" && <p role="alert" className="status-message error">{errorMessage}</p>}
        </section>

        <section className="result-card" aria-live="polite"><div className="section-bar"><div><span className="eyebrow">Video Result</span><h2>النتيجة</h2></div><span className={`result-status ${status}`}>{status === "processing" ? "PROCESSING" : status === "complete" ? "READY" : "STANDBY"}</span></div><div className="video-frame">{videoUrl ? <video src={videoUrl} controls playsInline /> : <div className="video-placeholder"><span>✧</span><p>{status === "processing" ? "نجهّز المشهد الآن" : "سيظهر الفيديو هنا"}</p><small>{prompt || "اكتب Prompt لبدء التوليد"}</small></div>}</div>{videoUrl && <div className="result-actions"><a href={videoUrl} download="seedance-video.mp4" className="small-button">Download ↧</a><a href={videoUrl} target="_blank" rel="noreferrer" className="small-button quiet">Preview ↗</a></div>}</section>

        <section className="history-card"><div className="section-bar"><div><span className="eyebrow">History</span><h2>آخر الفيديوهات</h2></div><span className="step-count">{history.length} نتائج</span></div>{history.length ? <div className="history-list">{history.map((item) => <button type="button" key={item.id} onClick={() => setVideoUrl(item.url)} className="history-item"><span className="history-thumb"><video src={item.url} muted /></span><span><strong>{item.prompt}</strong><small>{item.createdAt} · Seedance 2.5</small></span><span>↗</span></button>)}</div> : <p className="empty-history">ستظهر الفيديوهات التي تنشئها هنا.</p>}</section>

        <footer className="create-footer"><strong>منصة الشرقاوي</strong><span>صناعة أفكار تستحق أن تُرى</span><Link href="/">العودة للرئيسية ↑</Link></footer>
      </div>
    </main>
  );
}
