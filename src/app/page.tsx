import Link from "next/link";

export default function Home() {
  return (
    <main className="platform-home">
      <div className="laser-line" />
      <header className="platform-header">
        <Link href="/" className="brand" aria-label="منصة الشرقاوي"><span className="brand-mark">ش</span><span><strong>منصة الشرقاوي</strong><small>استوديو الإبداع الذكي</small></span></Link>
        <span className="platform-label">مساحة العمل</span>
      </header>
      <section className="platform-intro" aria-labelledby="platform-title">
        <p className="eyebrow">منصة صناعة المحتوى · 01</p>
        <h1 id="platform-title">اختر مساحتك<br /><em>وابدأ بصناعة الأثر.</em></h1>
        <p>أدوات مركّزة لتحويل الفكرة إلى صورة أو فيديو يحمل هويتك.</p>
      </section>
      <section className="platform-sections" aria-label="الأقسام الرئيسية">
        <Link href="/create" className="platform-card platform-card-video">
          <span className="platform-watermark" aria-hidden="true">فيديو</span>
          <span className="platform-card-index">01 / 02</span>
          <span className="platform-icon" aria-hidden="true">🎬</span>
          <span className="platform-card-content"><span className="eyebrow">Video Studio</span><strong>توليد الفيديو</strong><span>حوّل الوصف إلى مشهد سينمائي كامل بالصوت والحركة.</span></span>
          <span className="platform-card-action">دخول إلى الاستوديو <b>↗</b></span>
        </Link>
        <Link href="/image-create" className="platform-card platform-card-image">
          <span className="platform-watermark" aria-hidden="true">صورة</span>
          <span className="platform-card-index">02 / 02</span>
          <span className="platform-icon" aria-hidden="true">🖼️</span>
          <span className="platform-card-content"><span className="eyebrow">Image Studio</span><strong>توليد الصور</strong><span>ابنِ صورًا دقيقة بهوية بصرية واضحة وتفاصيل غنية.</span></span>
          <span className="platform-card-action">دخول إلى الاستوديو <b>↗</b></span>
        </Link>
      </section>
      <footer className="platform-footer"><strong>منصة الشرقاوي</strong><span>صناعة أفكار تستحق أن تُرى</span><span>© 2026</span></footer>
    </main>
  );
}
