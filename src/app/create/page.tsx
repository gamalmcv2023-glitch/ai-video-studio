"use client";

import Link from "next/link";
import { useState } from "react";

const videoTypeOptions = ["Text to Video", "Image to Video"];
const durationOptions = [
  { value: 15, label: "15 ثانية" },
  { value: 20, label: "20 ثانية" },
  { value: 25, label: "25 ثانية" },
  { value: 30, label: "30 ثانية" },
];
const ratioOptions = [
  { value: "16:9", label: "16:9", hint: "سينمائي" },
  { value: "9:16", label: "9:16", hint: "عمودي" },
  { value: "1:1", label: "1:1", hint: "مربع" },
];

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [videoType, setVideoType] = useState(videoTypeOptions[0]);
  const [duration, setDuration] = useState(durationOptions[0].value);
  const [ratio, setRatio] = useState("16:9");
  const [status, setStatus] = useState<"idle" | "processing" | "complete" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  async function handleSubmit() {
    if (!prompt.trim()) return;

    setStatus("processing");
    setErrorMessage("");
    setVideoUrl("");

    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), duration, aspectRatio: ratio, videoType }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "تعذر إنشاء الفيديو.");
      }

      setVideoUrl(`data:${result.video.mediaType};base64,${result.video.data}`);
      setStatus("complete");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "تعذر إنشاء الفيديو.");
      setStatus("error");
    }
  }

  return (
    <main className="create-shell min-h-screen overflow-hidden bg-[#0b0b0c] text-[#f4f0e7]">
      <div className="pointer-events-none fixed inset-0 opacity-70 [background:radial-gradient(circle_at_15%_10%,rgba(198,165,106,0.12),transparent_22%),radial-gradient(circle_at_85%_25%,rgba(75,108,120,0.12),transparent_30%)]" />
      <div className="relative mx-auto w-full max-w-7xl min-w-0 px-3 py-4 sm:px-8 sm:py-6 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-100/10 pb-4 sm:flex-nowrap sm:gap-4 sm:pb-6">
          <Link href="/" className="flex items-center gap-3" aria-label="العودة إلى الرئيسية">
            <span className="flex h-10 w-10 items-center justify-center border border-amber-200/50 bg-amber-100/10 font-serif text-sm font-black text-amber-100">ش</span>
            <span><strong className="block font-serif text-lg text-amber-50">منصة الشرقاوي</strong><small className="block text-[10px] text-slate-400">استوديو الإبداع الذكي</small></span>
          </Link>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-amber-100/60 sm:gap-4 sm:text-xs sm:tracking-[0.2em]">
            <span>استوديو الإبداع</span>
            <span className="h-1 w-1 rounded-full bg-cyan-300" />
            <span>مساحة خاصة</span>
          </div>
        </header>

        <section className="min-w-0 py-7 sm:py-16">
          <div className="mb-6 max-w-3xl sm:mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-200 sm:text-xs sm:tracking-[0.35em]">استوديو الفيديو · Text to Video</p>
            <h1 className="mt-3 font-serif text-3xl leading-tight text-amber-50 sm:mt-4 sm:text-6xl">اصنع المشهد الذي لا يُنسى.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">حوّل رؤيتك إلى فيديو، مع تحكم دقيق في الإيقاع، الإطار، والهوية البصرية.</p>
          </div>

          <div className="grid min-w-0 gap-4 lg:grid-cols-[1.45fr_0.8fr] lg:gap-6">
            <section className="min-w-0 rounded-2xl border border-amber-100/15 bg-white/[0.045] p-3 shadow-2xl shadow-violet-950/30 backdrop-blur-xl sm:rounded-[2rem] sm:p-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-8 sm:gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-amber-100/50">01 / الاتجاه</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">صِف رؤيتك</h2>
                </div>
                <div className="rounded-full border border-amber-200/25 bg-amber-100/10 px-3 py-1.5 text-[10px] text-amber-100 sm:px-4 sm:py-2 sm:text-xs">
                  Seedance 2.5
                </div>
              </div>

              <label className="block text-sm font-medium text-amber-50" htmlFor="prompt">وصف المشهد</label>
              <textarea id="prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="مثال: لقطة سينمائية لمدينة مستقبلية بعد المطر، انعكاسات نيون، حركة كاميرا بطيئة..." className="mt-2 min-h-32 w-full resize-y rounded-xl border border-white/10 bg-black/25 p-3 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/10 sm:mt-3 sm:min-h-44 sm:rounded-2xl sm:p-5 sm:text-base sm:leading-8" />

              <div className="mt-5 grid gap-4 sm:mt-8 sm:gap-5 sm:grid-cols-3">
                <fieldset><legend className="text-sm text-slate-300">نوع الفيديو</legend><div className="mt-2 grid grid-cols-2 gap-2">{videoTypeOptions.map((option) => <button key={option} type="button" onClick={() => setVideoType(option)} className={`rounded-xl border p-3 text-center text-xs transition ${videoType === option ? "border-amber-200 bg-amber-100/15 text-amber-50" : "border-white/10 text-slate-400 hover:border-white/30"}`}>{option}</button>)}</div></fieldset>
                <label className="text-sm text-slate-300">مدة الفيديو<select value={duration} onChange={(event) => setDuration(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 p-3 text-sm text-white outline-none focus:border-amber-200/60">{durationOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
                <fieldset><legend className="text-sm text-slate-300">نسبة العرض</legend><div className="mt-2 grid grid-cols-3 gap-2">{ratioOptions.map((option) => <button key={option.value} type="button" onClick={() => setRatio(option.value)} className={`rounded-xl border p-2 text-center transition ${ratio === option.value ? "border-amber-200 bg-amber-100/15 text-amber-50" : "border-white/10 text-slate-400 hover:border-white/30"}`}><span className="block text-xs font-semibold">{option.label}</span><span className="mt-1 block text-[10px]">{option.hint}</span></button>)}</div></fieldset>
              </div>

              <button type="button" onClick={handleSubmit} disabled={status === "processing" || !prompt.trim()} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-amber-100/30 bg-gradient-to-r from-amber-100 to-amber-300 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-200/10 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-9 sm:gap-3 sm:px-6 sm:py-4">
                {status === "processing" ? "جارٍ توليد الفيديو..." : status === "complete" ? "أنشئ نسخة جديدة" : "إنشاء الفيديو"}
                <span aria-hidden="true">✦</span>
              </button>
              {status === "processing" && <p className="mt-4 text-center text-sm text-cyan-200">يعمل Seedance 2.5 على بناء المشهد. قد يستغرق ذلك عدة دقائق.</p>}
              {status === "error" && <p role="alert" className="mt-4 text-center text-sm text-rose-300">{errorMessage}</p>}
            </section>

            <aside className="flex min-w-0 flex-col gap-4 sm:gap-6">
              <div className="rounded-2xl border border-cyan-200/15 bg-slate-950/60 p-3 shadow-xl shadow-cyan-950/20 sm:rounded-[2rem] sm:p-5">
                <div className="mb-5 flex items-center justify-between"><p className="text-xs uppercase tracking-[0.25em] text-amber-200/70">معاينة الناتج</p><span className="rounded-full border border-emerald-300/30 px-2 py-1 text-[10px] text-emerald-200">{status === "processing" ? "PROCESSING" : status === "complete" ? "READY" : "STANDBY"}</span></div>
                <div className={`relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#11101e] ${ratio === "9:16" ? "mx-auto max-w-[12rem]" : ""}`}>
                  {videoUrl ? <video src={videoUrl} controls playsInline className="h-full w-full object-cover" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(251,191,36,0.65),transparent_14%),radial-gradient(circle_at_25%_70%,rgba(34,211,238,0.55),transparent_24%),linear-gradient(135deg,#31204c,#050510_68%)]" />}
                  {status === "processing" && <div className="absolute inset-x-0 top-0 h-1 animate-pulse bg-amber-200 shadow-[0_0_20px_#fde68a]" />}
                  {!videoUrl && <div className="absolute inset-x-4 bottom-4"><p className="text-[10px] uppercase tracking-[0.25em] text-white/60">{status === "processing" ? "Generating" : "مساحتك"}</p><p className="mt-1 truncate text-sm font-semibold text-white">{prompt || "ابدأ بكتابة فكرة المشهد"}</p></div>}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-400"><span>النموذج <strong className="block pt-1 text-white">Seedance 2.5</strong></span><span>النوع <strong className="block pt-1 text-white">{videoType}</strong></span><span>المدة <strong className="block pt-1 text-white">{duration} ثانية</strong></span><span>النسبة <strong className="block pt-1 text-white">{ratio}</strong></span></div>
              </div>
              <div className="rounded-2xl border border-amber-100/10 bg-amber-100/[0.04] p-5 text-sm leading-7 text-slate-400"><span className="mb-2 block text-amber-100">ملاحظة الاستوديو</span>الخدمة جاهزة للاستخدام.</div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}