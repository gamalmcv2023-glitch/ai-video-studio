"use client";

import Link from "next/link";
import { useState } from "react";

const modelOptions = ["Seedance", "Kling 2.1", "Runway Gen-4"];
const durationOptions = ["15 ثانية", "20 ثانية", "25 ثانية", "30 ثانية"];
const ratioOptions = [
  { value: "16:9", label: "16:9", hint: "سينمائي" },
  { value: "9:16", label: "9:16", hint: "عمودي" },
  { value: "1:1", label: "1:1", hint: "مربع" },
];

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("Seedance");
  const [duration, setDuration] = useState(durationOptions[1]);
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
        body: JSON.stringify({ prompt: prompt.trim() }),
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
      <div className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-amber-100/10 pb-6">
          <Link href="/" className="flex items-center gap-3" aria-label="العودة إلى الرئيسية">
            <span className="flex h-10 w-10 items-center justify-center border border-amber-200/50 bg-amber-100/10 font-serif text-sm font-black text-amber-100">ش</span>
            <span><strong className="block font-serif text-lg text-amber-50">منصة الشرقاوي</strong><small className="block text-[10px] text-slate-400">استوديو الإبداع الذكي</small></span>
          </Link>
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-amber-100/60">
            <span>استوديو الإبداع</span>
            <span className="h-1 w-1 rounded-full bg-cyan-300" />
            <span>مساحة خاصة</span>
          </div>
        </header>

        <section className="py-12 sm:py-16">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">استوديو الفيديو · Text to Video</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-amber-50 sm:text-6xl">اصنع المشهد الذي لا يُنسى.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">حوّل رؤيتك إلى فيديو، مع تحكم دقيق في الإيقاع، الإطار، والهوية البصرية.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.45fr_0.8fr]">
            <section className="rounded-[2rem] border border-amber-100/15 bg-white/[0.045] p-5 shadow-2xl shadow-violet-950/30 backdrop-blur-xl sm:p-8">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-amber-100/50">01 / الاتجاه</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">صِف رؤيتك</h2>
                </div>
                <div className="rounded-full border border-white/10 bg-amber-100/10 px-4 py-2 text-xs text-amber-100">
                  Text to Video
                </div>
              </div>

              <label className="block text-sm font-medium text-amber-50" htmlFor="prompt">وصف المشهد</label>
              <textarea id="prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="مثال: لقطة سينمائية لمدينة مستقبلية بعد المطر، انعكاسات نيون، حركة كاميرا بطيئة..." className="mt-3 min-h-44 w-full resize-y rounded-2xl border border-white/10 bg-black/25 p-5 text-base leading-8 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/10" />

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                <label className="text-sm text-slate-300">المحرك<select value={model} onChange={(event) => setModel(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 p-3 text-sm text-white outline-none focus:border-amber-200/60">{modelOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                <label className="text-sm text-slate-300">مدة العرض<select value={duration} onChange={(event) => setDuration(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 p-3 text-sm text-white outline-none focus:border-amber-200/60">{durationOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                <fieldset><legend className="text-sm text-slate-300">نسبة العرض</legend><div className="mt-2 grid grid-cols-3 gap-2">{ratioOptions.map((option) => <button key={option.value} type="button" onClick={() => setRatio(option.value)} className={`rounded-xl border p-2 text-center transition ${ratio === option.value ? "border-amber-200 bg-amber-100/15 text-amber-50" : "border-white/10 text-slate-400 hover:border-white/30"}`}><span className="block text-xs font-semibold">{option.label}</span><span className="mt-1 block text-[10px]">{option.hint}</span></button>)}</div></fieldset>
              </div>

              <button type="button" onClick={handleSubmit} disabled={status === "processing" || !prompt.trim()} className="mt-9 flex w-full items-center justify-center gap-3 rounded-xl border border-amber-100/30 bg-gradient-to-r from-amber-100 to-amber-300 px-6 py-4 font-bold text-slate-950 shadow-lg shadow-amber-200/10 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50">
                {status === "processing" ? "جارٍ توليد الفيديو..." : status === "complete" ? "أنشئ نسخة جديدة" : "إنشاء الفيديو"}
                <span aria-hidden="true">✦</span>
              </button>
              {status === "processing" && <p className="mt-4 text-center text-sm text-cyan-200">يعمل Seedance 2.5 على بناء المشهد. قد يستغرق ذلك عدة دقائق.</p>}
              {status === "error" && <p role="alert" className="mt-4 text-center text-sm text-rose-300">{errorMessage}</p>}
            </section>

            <aside className="flex flex-col gap-6">
              <div className="rounded-[2rem] border border-cyan-200/15 bg-slate-950/60 p-5 shadow-xl shadow-cyan-950/20">
                <div className="mb-5 flex items-center justify-between"><p className="text-xs uppercase tracking-[0.25em] text-amber-200/70">معاينة الناتج</p><span className="rounded-full border border-emerald-300/30 px-2 py-1 text-[10px] text-emerald-200">{status === "processing" ? "PROCESSING" : status === "complete" ? "READY" : "STANDBY"}</span></div>
                <div className={`relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#11101e] ${ratio === "9:16" ? "mx-auto max-w-[12rem]" : ""}`}>
                  {videoUrl ? <video src={videoUrl} controls playsInline className="h-full w-full object-cover" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(251,191,36,0.65),transparent_14%),radial-gradient(circle_at_25%_70%,rgba(34,211,238,0.55),transparent_24%),linear-gradient(135deg,#31204c,#050510_68%)]" />}
                  {status === "processing" && <div className="absolute inset-x-0 top-0 h-1 animate-pulse bg-amber-200 shadow-[0_0_20px_#fde68a]" />}
                  {!videoUrl && <div className="absolute inset-x-4 bottom-4"><p className="text-[10px] uppercase tracking-[0.25em] text-white/60">{status === "processing" ? "Generating" : "مساحتك"}</p><p className="mt-1 truncate text-sm font-semibold text-white">{prompt || "ابدأ بكتابة فكرة المشهد"}</p></div>}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-400"><span>المحرك <strong className="block pt-1 text-white">{model}</strong></span><span>المدة <strong className="block pt-1 text-white">{duration}</strong></span><span>النسبة <strong className="block pt-1 text-white">{ratio}</strong></span><span>Engine <strong className="block pt-1 text-emerald-200">Seedance 2.5</strong></span></div>
              </div>
              <div className="rounded-2xl border border-amber-100/10 bg-amber-100/[0.04] p-5 text-sm leading-7 text-slate-400"><span className="mb-2 block text-amber-100">ملاحظة الاستوديو</span>التوليد يتم عبر Vercel AI Gateway. يبقى مفتاح API على الخادم ولا يظهر في الواجهة.</div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}