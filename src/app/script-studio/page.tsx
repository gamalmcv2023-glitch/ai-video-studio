"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const videoTypes = ["إعلان منتج", "فيلم قصير", "محتوى اجتماعي", "فيديو تعريفي"];
const languages = ["العربية", "English", "Français"];
const styles = ["سينمائي فاخر", "واقعي وحيوي", "مستقبلي", "هادئ وتأملي"];
const durations = ["15 ثانية", "20 ثانية", "25 ثانية", "30 ثانية"];
const detailLevels = ["مختصر", "دقيق", "سينمائي مفصل"];

type ScriptScene = {
  time: string;
  description: string;
  camera: string;
  motion: string;
  dialogue: string;
  sound: string;
  music: string;
  transition: string;
};

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="block text-[10px] text-white/55">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1.5 w-full border border-white/10 bg-[#101011] px-2.5 py-2.5 text-xs text-[#f4f0e7] outline-none transition focus:border-[#c6a56a]/70">
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

export default function ScriptStudioPage() {
  const [idea, setIdea] = useState("");
  const [videoType, setVideoType] = useState(videoTypes[0]);
  const [language, setLanguage] = useState(languages[0]);
  const [style, setStyle] = useState(styles[0]);
  const [duration, setDuration] = useState(durations[1]);
  const [detail, setDetail] = useState(detailLevels[1]);
  const [script, setScript] = useState<ScriptScene[] | null>(null);

  function createScript(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = idea.trim();
    if (!subject) return;

    setScript([
      { time: "00:00 - 00:05", description: `لقطة افتتاحية واسعة تكشف ${subject} بإضاءة ذهبية ناعمة.`, camera: "اقتراب بطيء مع حركة جانبية هادئة.", motion: "تظهر العناصر الرئيسية تدريجيًا وسط تفاصيل دقيقة.", dialogue: "تبدأ الحكاية من لحظة واحدة.", sound: "همسة هواء خفيفة مع نبضة افتتاحية.", music: "أوتار إلكترونية هادئة.", transition: "تلاشي ضوئي إلى اللقطة التالية." },
      { time: "00:05 - 00:12", description: `لقطات تفصيلية تبرز ملمس ${subject} وروحه البصرية.`, camera: "دوران نصف دائري حول العنصر الرئيسي.", motion: "تتحرك التفاصيل بانسيابية مع إيقاع المشهد.", dialogue: `${subject}، بصياغة تترك أثرًا.`, sound: "نقرة انتقالية ولمسات صوتية دقيقة.", music: "تصاعد موسيقي خفيف يحافظ على التركيز.", transition: "قطع ناعم على حركة العنصر." },
      { time: `00:12 - ${duration === "15 ثانية" ? "00:15" : "00:20"}`, description: "لقطة ختامية مركزة تجمع الهوية والرسالة في إطار واحد.", camera: "تثبيت تدريجي مع ارتفاع بسيط في زاوية الرؤية.", motion: "تستقر العناصر في تكوين متوازن مع ظهور الرسالة.", dialogue: "فكرة تستحق أن تُرى.", sound: "نغمة ختامية قصيرة وواضحة.", music: "هبوط موسيقي دافئ مع صدى خفيف.", transition: "انتقال إلى الشعار ثم إظلام تدريجي." },
    ]);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0b0c] text-[#f4f0e7]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(198,165,106,0.11),transparent_24%),radial-gradient(circle_at_14%_80%,rgba(49,91,105,0.1),transparent_28%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-4 sm:px-8 sm:py-7">
        <div className="h-px w-full bg-gradient-to-l from-transparent via-[#c6a56a]/70 to-transparent" />
        <header className="flex items-center justify-between border-b border-white/10 py-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label="العودة إلى منصة الشرقاوي">
            <span className="grid h-8 w-8 place-items-center border border-[#c6a56a] font-serif text-lg text-[#c6a56a]">ش</span>
            <span><strong className="block text-sm">منصة الشرقاوي</strong><small className="block text-[9px] text-white/45">استوديو الإبداع الذكي</small></span>
          </Link>
          <Link href="/" className="text-xs text-[#c6a56a] transition hover:text-[#f4f0e7]">العودة للرئيسية ↗</Link>
        </header>

        <section className="mx-auto w-full max-w-4xl flex-1 py-7 sm:py-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div><p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-[#c6a56a]">استوديو Script · 04</p><h1 className="font-serif text-3xl font-normal sm:text-4xl">استوديو Script <em className="not-italic text-[#c6a56a]">للفيديو</em></h1></div>
            <span className="mb-1 hidden border border-[#c6a56a]/20 bg-[#c6a56a]/5 px-2.5 py-1.5 text-[9px] text-white/50 sm:block">واجهة تجريبية · بدون API</span>
          </div>

          <form onSubmit={createScript} className="border border-white/10 bg-[#151516]/85 p-4 shadow-2xl shadow-black/25 sm:p-5">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3"><h2 className="text-sm font-semibold text-[#ead39e]">إعدادات السكريبت</h2><span className="text-[9px] text-white/35">01 / الاتجاه</span></div>
            <label className="block text-[10px] text-white/55" htmlFor="video-idea">فكرة الفيديو<input id="video-idea" value={idea} onChange={(event) => setIdea(event.target.value)} placeholder="مثال: إطلاق عطر شرقي فاخر في مدينة ليلية" className="mt-1.5 w-full border border-white/10 bg-[#101011] px-3 py-3 text-xs text-white outline-none transition placeholder:text-white/25 focus:border-[#c6a56a]/70" /></label>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField label="نوع الفيديو" value={videoType} options={videoTypes} onChange={setVideoType} />
              <SelectField label="اللغة" value={language} options={languages} onChange={setLanguage} />
              <SelectField label="أسلوب الفيديو" value={style} options={styles} onChange={setStyle} />
              <SelectField label="مدة الفيديو" value={duration} options={durations} onChange={setDuration} />
              <SelectField label="مستوى التفاصيل" value={detail} options={detailLevels} onChange={setDetail} />
            </div>
            <button type="submit" disabled={!idea.trim()} className="mt-5 flex w-full items-center justify-center gap-2 bg-[#c6a56a] px-4 py-3 text-xs font-bold text-[#17130b] transition hover:bg-[#e0c486] disabled:cursor-not-allowed disabled:opacity-45">إنشاء Script <span aria-hidden="true">✦</span></button>
          </form>

          <section className="mt-5 border border-white/10 bg-[#151516]/70" aria-live="polite">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><h2 className="text-sm font-semibold text-[#ead39e]">نموذج Script التجريبي</h2><span className="text-[9px] text-white/35">02 / المشاهد</span></div>
            {script ? <div className="space-y-3 p-3 sm:p-4">{script.map((scene, index) => <article key={scene.time} className="border border-white/10 bg-[#0f0f10] p-3"><div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2"><h3 className="text-xs font-semibold text-[#c6a56a]">المشهد {String(index + 1).padStart(2, "0")}</h3><span className="text-[10px] text-white/45">{scene.time}</span></div><dl className="grid gap-x-4 gap-y-2 text-[10px] leading-6 sm:grid-cols-2"><div><dt className="text-white/35">وصف المشهد</dt><dd className="text-white/70">{scene.description}</dd></div><div><dt className="text-white/35">حركة الكاميرا</dt><dd className="text-white/70">{scene.camera}</dd></div><div><dt className="text-white/35">حركة العناصر والشخصيات</dt><dd className="text-white/70">{scene.motion}</dd></div><div><dt className="text-white/35">الحوار أو التعليق الصوتي</dt><dd className="text-white/70">{scene.dialogue}</dd></div><div><dt className="text-white/35">المؤثرات الصوتية</dt><dd className="text-white/70">{scene.sound}</dd></div><div><dt className="text-white/35">الموسيقى</dt><dd className="text-white/70">{scene.music}</dd></div><div className="sm:col-span-2"><dt className="text-white/35">الانتقال للمشهد التالي</dt><dd className="text-white/70">{scene.transition}</dd></div></dl></article>)}</div> : <div className="grid min-h-48 place-content-center px-5 text-center"><span className="text-2xl text-[#c6a56a]">✧</span><p className="mt-2 text-xs text-white/65">سيظهر السكريبت المنظم هنا</p><small className="mt-1 text-[10px] text-white/35">أدخل فكرة الفيديو لبدء النموذج التجريبي</small></div>}
          </section>
        </section>
      </div>
    </main>
  );
}