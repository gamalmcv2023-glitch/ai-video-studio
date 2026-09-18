"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const scriptFields = [
  ["الفكرة الأساسية", "مثال: إطلاق عطر شرقي فاخر في مدينة ليلية"],
  ["نوع المحتوى", "إعلان منتج"],
  ["الجمهور المستهدف", "مثال: محبو المنتجات الفاخرة"],
  ["أسلوب الفيديو", "سينمائي فاخر"],
];

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const [scriptIdea, setScriptIdea] = useState("");
  const [script, setScript] = useState("");

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) return;
    setChat((current) => [...current, `أنت: ${message.trim()}`, "أسترا: هذه واجهة تجريبية. سيتم توصيل الذكاء الاصطناعي لاحقًا."]);
    setMessage("");
  }

  function createScript(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!scriptIdea.trim()) return;
    setScript(`المشهد 01 | 00:00 - 00:05\nالصورة: لقطة افتتاحية واسعة لـ ${scriptIdea.trim()} بإضاءة ذهبية ناعمة.\nالكاميرا: اقتراب بطيء مع حركة جانبية هادئة.\nالحركة: يظهر العنصر الرئيسي تدريجيًا وسط تفاصيل دقيقة.\nالتعليق الصوتي: تبدأ الحكاية من لحظة واحدة.\nالمؤثرات: همسة هواء خفيفة، ثم انتقال سينمائي ناعم.\n\nالمشهد 02 | 00:05 - 00:15\nالصورة: لقطة تفصيلية للعنصر مع انعكاسات ضوء دقيقة.\nالكاميرا: دوران 180 درجة حول المنتج.\nالحركة: حركة بطيئة محسوبة تبرز الخامة والتفاصيل.\nالتعليق الصوتي: ${scriptIdea.trim()}، بصياغة تترك أثرًا.\nالموسيقى: أوتار إلكترونية هادئة بإيقاع متصاعد.\nالانتقال: قطع ناعم إلى الشعار والرسالة الختامية.`);
  }

  return (
    <main id="home" className="site-shell">
      <div className="laser-line" />
      <header className="topbar">
        <Link href="#home" className="brand" aria-label="منصة الشرقاوي"><span className="brand-mark">ش</span><span><strong>منصة الشرقاوي</strong><small>استوديو الإبداع الذكي</small></span></Link>
        <nav className="desktop-nav" aria-label="التنقل الرئيسي"><a href="#home">الرئيسية</a><Link href="/create">إنشاء فيديو</Link><Link href="/create">Seedance 2.5</Link><Link href="/create">Text to Video</Link><Link href="/create">Image to Video</Link><Link href="/script-studio">Script Studio</Link><Link href="/astra">شات جي بي تي أسترا</Link><a href="#work">أعمالي</a></nav>
        <Link className="button button-gold compact" href="/create">ابدأ مشروعًا <span>↗</span></Link>
      </header>

      <section className="hero-section">
        <div className="hero-copy"><p className="eyebrow">منصة صناعة المحتوى · 01</p><h1>حوّل الفكرة<br /><em>إلى أثر بصري.</em></h1><p className="hero-text">مساحة عمل عربية لصناعة فيديوهات تحمل هويتك، من أول سطر إلى آخر لقطة.</p><div className="hero-actions"><Link href="/create" className="button button-gold">إنشاء فيديو <span>↗</span></Link><a href="#astra" className="button button-quiet">استكشف المنصة</a></div><div className="hero-meta"><span><b>04</b> أدوات إبداعية</span><span><b>15–30</b> ثانية للسكريبت</span><span><b>24/7</b> مساحة عمل</span></div></div>
        <div className="hero-art" aria-label="معاينة مشهد سينمائي"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-sun">ش</div><div className="art-caption"><span>مشهد 01 / 04</span><strong>بداية جديدة</strong></div></div>
      </section>

      <section className="tool-strip" aria-label="أقسام المنصة"><Link href="/create" className="tool-card active"><span className="tool-index">03</span><span><b>Seedance 2.5</b><small>محرك الفيديو</small></span><span className="arrow">↗</span></Link><Link href="/create" className="tool-card"><span className="tool-index">04</span><span><b>Text to Video</b><small>فكرة إلى فيديو</small></span><span className="arrow">↗</span></Link><Link href="/create" className="tool-card"><span className="tool-index">05</span><span><b>Image to Video</b><small>صورة إلى حركة</small></span><span className="arrow">↗</span></Link><Link href="/script-studio" className="tool-card"><span className="tool-index">06</span><span><b>Script Studio</b><small>سكريبت دقيق</small></span><span className="arrow">↗</span></Link><Link href="/astra" className="tool-card"><span className="tool-index">07</span><span><b>شات جي بي تي أسترا</b><small>رفيقك الإبداعي</small></span><span className="arrow">↗</span></Link></section>

      <section id="astra" className="content-section split-section"><div className="section-heading"><p className="eyebrow">شات جي بي تي أسترا · 02</p><h2>فكرة أوضح،<br /><em>بداية أقوى.</em></h2><p>مساحة حوار هادئة لترتيب الأفكار وتطويرها. الواجهة جاهزة، وسيتم ربط المحرك الذكي لاحقًا.</p></div><div className="chat-panel"><div className="panel-top"><span className="status-dot" /> أسترا متاحة للتجربة <span>واجهة فقط</span></div><div className="chat-messages">{chat.length ? chat.map((item, index) => <p key={`${item}-${index}`} className={item.startsWith("أنت") ? "user-message" : "astra-message"}>{item}</p>) : <div className="empty-chat"><span>✦</span><p>ما الذي تريد بناءه اليوم؟</p><small>اكتب فكرة، سؤالًا، أو اتجاهًا بصريًا.</small></div>}</div><form className="chat-input" onSubmit={sendMessage}><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="اكتب رسالتك هنا..." aria-label="رسالتك إلى أسترا" /><button type="submit" aria-label="إرسال الرسالة">↑</button></form></div></section>

      <section id="script" className="content-section script-section"><div className="section-heading"><p className="eyebrow">استوديو Script · 03</p><h2>اكتب المشهد<br /><em>بتفاصيله.</em></h2><p>حوّل الفكرة الخام إلى مخطط تصوير واضح من 15 إلى 30 ثانية، مستقل عن مولد الفيديو.</p></div><div className="script-panel"><form onSubmit={createScript} className="script-form">{scriptFields.map(([label, placeholder], index) => <label key={label}>{label}<input value={index === 0 ? scriptIdea : undefined} onChange={index === 0 ? (event) => setScriptIdea(event.target.value) : undefined} placeholder={placeholder} /></label>)}<div className="form-row"><label>اللغة<select defaultValue="العربية"><option>العربية</option><option>English</option></select></label><label>المدة<select defaultValue="20 ثانية"><option>15 ثانية</option><option>20 ثانية</option><option>25 ثانية</option><option>30 ثانية</option></select></label><label>التفاصيل<select defaultValue="دقيق"><option>مختصر</option><option>دقيق</option><option>سينمائي مفصل</option></select></label></div><button className="button button-gold" type="submit">إنشاء السكريبت <span>✦</span></button></form>{script ? <pre className="script-result">{script}</pre> : <div className="script-placeholder"><span>✧</span><p>سيظهر السكريبت المنظم هنا</p><small>المشهد · الصورة · الكاميرا · الحوار · الصوت · الانتقالات</small></div>}</div></section>

      <section id="work" className="content-section work-section"><div><p className="eyebrow">أعمالي · 04</p><h2>مساحتك<br /><em>تتذكر كل شيء.</em></h2></div><div className="empty-work"><span>⌁</span><p>لا توجد مشاريع بعد</p><Link href="/create">أنشئ أول فيديو ↗</Link></div></section>
      <footer className="footer"><strong>منصة الشرقاوي</strong><span>صناعة أفكار تستحق أن تُرى</span><span>© 2026</span><a href="#home">العودة للأعلى ↑</a></footer>
    </main>
  );
}