"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

const modelOptions = ["Seedance", "Kling 2.1", "Runway Gen-4"];
const durationOptions = ["5 ثوانٍ", "10 ثوانٍ", "15 ثانية"];
const ratioOptions = [
  { value: "16:9", label: "16:9", hint: "سينمائي" },
  { value: "9:16", label: "9:16", hint: "عمودي" },
  { value: "1:1", label: "1:1", hint: "مربع" },
];

export default function CreatePage() {
  const [mode, setMode] = useState("Text to Video");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("Seedance");
  const [duration, setDuration] = useState(durationOptions[1]);
  const [ratio, setRatio] = useState("16:9");
  const [imagePreview, setImagePreview] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "complete">("idle");

  useEffect(() => {
    if (status !== "processing") return;
    const timer = window.setTimeout(() => setStatus("complete"), 2600);
    return () => window.clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  }

  function handleSubmit() {
    if (!prompt.trim() && !imagePreview) return;
    setStatus("processing");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#080711] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-70 [background:radial-gradient(circle_at_15%_10%,rgba(251,191,36,0.12),transparent_22%),radial-gradient(circle_at_85%_25%,rgba(168,85,247,0.18),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(34,211,238,0.12),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-amber-100/10 pb-6">
          <Link href="/" className="flex items-center gap-3" aria-label="العودة إلى الرئيسية">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200/50 bg-amber-100/10 font-serif text-sm font-black text-amber-100">AV</span>
            <span className="font-serif text-lg tracking-[0.18em] text-amber-50">AURELIA</span>
          </Link>
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-amber-100/60">
            <span>Creator suite</span>
            <span className="h-1 w-1 rounded-full bg-cyan-300" />
            <span>Private beta</span>
          </div>
        </header>

        <section className="py-12 sm:py-16">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">The cosmic atelier</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-amber-50 sm:text-6xl">اصنع المشهد الذي لا يُنسى.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">حوّل رؤيتك إلى فيديو تجريبي نابض بالحياة، مع تحكم دقيق في الإيقاع، الإطار، والهوية البصرية.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.45fr_0.8fr]">
            <section className="rounded-[2rem] border border-amber-100/15 bg-white/[0.045] p-5 shadow-2xl shadow-violet-950/30 backdrop-blur-xl sm:p-8">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-amber-100/50">01 / Direction</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">صِف رؤيتك</h2>
                </div>
                <div className="flex rounded-full border border-white/10 bg-black/20 p-1 text-xs">
                  {["Text to Video", "Image to Video"].map((option) => (
                    <button key={option} type="button" onClick={() => setMode(option)} className={`rounded-full px-4 py-2 transition ${mode === option ? "bg-amber-100 text-slate-950" : "text-slate-300 hover:text-white"}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block text-sm font-medium text-amber-50" htmlFor="prompt">Prompt</label>
              <textarea id="prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="مثال: لقطة سينمائية لمدينة مستقبلية بعد المطر، انعكاسات نيون، حركة كاميرا بطيئة..." className="mt-3 min-h-44 w-full resize-y rounded-2xl border border-white/10 bg-black/25 p-5 text-base leading-8 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/10" />

              {mode === "Image to Video" && (
                <label className="mt-4 flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-cyan-200/30 bg-cyan-200/[0.04] p-4 transition hover:border-cyan-200/60">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-200/10 text-xl text-cyan-200">＋</span>
                  <span className="flex-1"><span className="block text-sm font-semibold text-white">أضف صورة مرجعية</span><span className="mt-1 block text-xs text-slate-400">PNG أو JPG حتى 10MB</span></span>
                  {imagePreview && <img src={imagePreview} alt="معاينة الصورة المرجعية" className="h-14 w-20 rounded-lg object-cover" />}
                  <input type="file" accept="image/png,image/jpeg" onChange={handleImageChange} className="sr-only" />
                </label>
              )}

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                <label className="text-sm text-slate-300">Model<select value={model} onChange={(event) => setModel(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 p-3 text-sm text-white outline-none focus:border-cyan-300/60">{modelOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                <label className="text-sm text-slate-300">Duration<select value={duration} onChange={(event) => setDuration(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 p-3 text-sm text-white outline-none focus:border-cyan-300/60">{durationOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                <fieldset><legend className="text-sm text-slate-300">Aspect Ratio</legend><div className="mt-2 grid grid-cols-3 gap-2">{ratioOptions.map((option) => <button key={option.value} type="button" onClick={() => setRatio(option.value)} className={`rounded-xl border p-2 text-center transition ${ratio === option.value ? "border-amber-200 bg-amber-100/15 text-amber-50" : "border-white/10 text-slate-400 hover:border-white/30"}`}><span className="block text-xs font-semibold">{option.label}</span><span className="mt-1 block text-[10px]">{option.hint}</span></button>)}</div></fieldset>
              </div>

              <button type="button" onClick={handleSubmit} disabled={status === "processing" || (!prompt.trim() && !imagePreview)} className="mt-9 flex w-full items-center justify-center gap-3 rounded-xl border border-amber-100/30 bg-gradient-to-r from-amber-100 to-amber-300 px-6 py-4 font-bold text-slate-950 shadow-lg shadow-amber-200/10 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50">
                {status === "processing" ? "جارٍ بناء المشهد..." : status === "complete" ? "أنشئ نسخة جديدة" : "إنشاء الفيديو"}
                <span aria-hidden="true">✦</span>
              </button>
            </section>

            <aside className="flex flex-col gap-6">
              <div className="rounded-[2rem] border border-cyan-200/15 bg-slate-950/60 p-5 shadow-xl shadow-cyan-950/20">
                <div className="mb-5 flex items-center justify-between"><p className="text-xs uppercase tracking-[0.25em] text-cyan-200/70">Output preview</p><span className="rounded-full border border-emerald-300/30 px-2 py-1 text-[10px] text-emerald-200">{status === "processing" ? "PROCESSING" : status === "complete" ? "READY" : "STANDBY"}</span></div>
                <div className={`relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#11101e] ${ratio === "9:16" ? "mx-auto max-w-[12rem]" : ""}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(251,191,36,0.65),transparent_14%),radial-gradient(circle_at_25%_70%,rgba(34,211,238,0.55),transparent_24%),linear-gradient(135deg,#31204c,#050510_68%)]" />
                  {status === "processing" && <div className="absolute inset-x-0 top-0 h-1 animate-pulse bg-amber-200 shadow-[0_0_20px_#fde68a]" />}
                  <div className="absolute inset-x-4 bottom-4"><p className="text-[10px] uppercase tracking-[0.25em] text-white/60">{status === "complete" ? "Demo render" : "Your canvas"}</p><p className="mt-1 truncate text-sm font-semibold text-white">{prompt || "ابدأ بكتابة فكرة المشهد"}</p></div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-400"><span>Model <strong className="block pt-1 text-white">{model}</strong></span><span>Duration <strong className="block pt-1 text-white">{duration}</strong></span><span>Ratio <strong className="block pt-1 text-white">{ratio}</strong></span><span>Engine <strong className="block pt-1 text-emerald-200">Demo mode</strong></span></div>
              </div>
              <div className="rounded-2xl border border-amber-100/10 bg-amber-100/[0.04] p-5 text-sm leading-7 text-slate-400"><span className="mb-2 block text-amber-100">ملاحظة الاستوديو</span>هذه معاينة Demo محلية. عند ربط مزود التوليد لاحقًا، ستبقى مفاتيح API على الخادم ولن تظهر في الواجهة.</div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}