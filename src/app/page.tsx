const features = [
  {
    title: "إنشاء سيناريوهات ذكية",
    description: "حوّل فكرة المنتج إلى قصة فيديو متكاملة مع نصوص وأفكار إبداعية تلقائيًا.",
  },
  {
    title: "تحرير سريع بالذكاء الاصطناعي",
    description: "قصّ المقاطع، اضبط الصوت، ووفّر لقطات جذابة من خلال أدوات تدعم الإنتاج السريع.",
  },
  {
    title: "تصدير جاهز للنشر",
    description: "احصل على فيديوهات بمقاسات مناسبة للمنصات الاجتماعية والتسويق الرقمي في دقائق.",
  },
];

const steps = [
  "اختر الموضوع أو المنتج",
  "حدّد الأسلوب والهوية البصرية",
  "أنشئ الفيديو تلقائيًا",
  "صدّره وشارك النتيجة",
];

const stats = [
  { value: "3x", label: "أسرع في الإنتاج" },
  { value: "120+", label: "قالب قابل للتخصيص" },
  { value: "99%", label: "رضا المستخدمين" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070b17] text-white">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-8 sm:px-8 lg:px-10">
        <header className="mb-16 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-cyan-400 to-emerald-400 text-lg font-black text-slate-950">
              AI
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-slate-300">VIDEO</p>
              <p className="text-lg font-bold text-white">STUDIO</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">المزايا</a>
            <a href="#workflow" className="transition hover:text-white">العملية</a>
            <a href="#pricing" className="transition hover:text-white">الأسعار</a>
          </nav>

          <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
            ابدأ الآن
          </button>
        </header>

        <section className="grid items-center gap-10 pb-20 pt-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
              منصة إنتاج الفيديو بالذكاء الاصطناعي
            </span>

            <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              أنشئ فيديوهات احترافية في دقائق فقط.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              من الأفكار إلى النتيجة النهائية، يساعدك AI Video Studio على إنتاج محتوى مرئي جذاب
              للعلامات التجارية، الحملات التسويقية، والمحتوى الاجتماعي، مع الالتزام بجودة عالية.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02]">
                جرّب الآن
              </button>
              <button className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                شاهد العرض
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-300">
              <div>
                <span className="block text-2xl font-black text-white">4.9/5</span>
                تقييم المستخدمين
              </div>
              <div>
                <span className="block text-2xl font-black text-white">10k+</span>
                فيديو منشأ
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-violet-500/20 via-cyan-400/10 to-emerald-400/20 blur-2xl" />
            <div className="glass-card overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-violet-950/40">
              <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4">
                <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
                  <span>توليد فيديو</span>
                  <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2 py-1 text-emerald-300">
                    Live
                  </span>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-violet-500/20 via-slate-900 to-cyan-500/20 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-300">لقطة رئيسية</p>
                      <h2 className="text-2xl font-bold text-white">إطلاق المنتج</h2>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-cyan-200">30s</div>
                  </div>

                  <div className="grid gap-3">
                    <div className="h-28 rounded-2xl bg-gradient-to-br from-[#f472b6] via-[#8b5cf6] to-[#22d3ee]" />
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-16 rounded-xl bg-white/10" />
                      <div className="h-16 rounded-xl bg-white/10" />
                      <div className="h-16 rounded-xl bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-16">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold tracking-[0.25em] text-cyan-300">المزايا</p>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              أدوات ترفع جودة الإنتاج التسويقي
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-400/30 text-xl">
                  ✦
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-base leading-7 text-slate-300">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="py-16">
          <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold tracking-[0.25em] text-violet-300">العملية</p>
              <h2 className="mt-4 text-3xl font-black text-white">من الفكرة إلى الفيديو في 4 خطوات</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {steps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <p className="text-lg font-semibold text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-16">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold tracking-[0.25em] text-emerald-300">الأسعار</p>
            <h2 className="mt-4 text-3xl font-black text-white">خطة تناسب كل فريق</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-8 text-center">
                <div className="text-4xl font-black text-white">{item.value}</div>
                <div className="mt-3 text-slate-300">{item.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
