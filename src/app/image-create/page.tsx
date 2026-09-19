"use client";

import Link from "next/link";
import { useState } from "react";

const imageModels = [
  { name: "إيماجين ستوديو", provider: "Image Studio", mark: "IS", description: "تفاصيل واقعية وتكوينات فاخرة" },
  { name: "فلوكس برو", provider: "Flux", mark: "FX", description: "هوية بصرية دقيقة ومشاهد إبداعية" },
  { name: "إيدجنت برو", provider: "Adobe Firefly", mark: "AF", description: "صور تجارية آمنة للاستخدام" },
];

export default function ImageCreatePage() {
  const [selectedModel, setSelectedModel] = useState(imageModels[0]);

  return (
    <main className="create-shell image-create-shell">
      <div className="create-frame">
        <header className="create-header"><Link href="/" className="brand" aria-label="العودة إلى الأقسام"><span className="brand-mark">ش</span><span><strong>منصة الشرقاوي</strong><small>استوديو الإبداع الذكي</small></span></Link><span className="header-note">IMAGE STUDIO</span><Link href="/create" className="header-link">توليد الفيديو ↗</Link></header>
        <section className="create-hero"><p className="eyebrow">Image suite · 02</p><h1>صمّم الصورة التي تُرى.</h1><p>حوّل فكرتك إلى صورة ذات حضور بصري واضح وتفاصيل محسوبة.</p></section>
        <section className="create-card image-creator" aria-label="توليد الصور">
          <div className="section-bar"><div><span className="eyebrow">استوديو الإبداع</span><h2>توليد الصور</h2></div><span className="step-count">01 / 01</span></div>
          <div className="field-block"><label>اختيار النموذج</label><div className="image-model-list">{imageModels.map((model) => <button type="button" key={model.name} onClick={() => setSelectedModel(model)} className={`image-model-option ${selectedModel.name === model.name ? "active" : ""}`}><span className="model-logo">{model.mark}</span><span><strong>{model.name}</strong><small>{model.provider}</small><small>{model.description}</small></span><b>{selectedModel.name === model.name ? "✓" : ""}</b></button>)}</div></div>
          <div className="field-block"><label htmlFor="image-prompt">وصف الصورة</label><textarea id="image-prompt" placeholder="مثال: بورتريه سينمائي بإضاءة ذهبية وخلفية داكنة، تفاصيل دقيقة..." /></div>
          <div className="field-block"><label>نسبة العرض</label><div className="ratio-list"><button type="button" className="ratio active"><strong>1:1</strong><span>مربع</span></button><button type="button" className="ratio"><strong>16:9</strong><span>أفقي</span></button><button type="button" className="ratio"><strong>9:16</strong><span>عمودي</span></button></div></div>
          <button type="button" className="generate-button" disabled>🎨 إنشاء الصورة <span>✦</span></button>
          <p className="image-coming-soon">واجهة توليد الصور جاهزة، وسيتم توصيل مزود الصور في خطوة لاحقة.</p>
        </section>
        <section className="result-card" aria-label="نتيجة الصورة"><div className="section-bar"><div><span className="eyebrow">المخرجات</span><h2>نتيجة الصورة</h2></div><span className="result-status">بانتظار الوصف</span></div><div className="image-placeholder"><span>✧</span><p>ستظهر الصورة هنا</p><small>{selectedModel.name} · مساحة المعاينة</small></div></section>
        <footer className="create-footer"><strong>منصة الشرقاوي</strong><span>صناعة أفكار تستحق أن تُرى</span><Link href="/">العودة للأقسام ↑</Link></footer>
      </div>
    </main>
  );
}