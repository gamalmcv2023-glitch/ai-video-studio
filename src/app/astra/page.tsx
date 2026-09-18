"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type ChatMessage = {
  id: number;
  role: "astra" | "user";
  text: string;
};

const demoReply = "هذه واجهة أسترا التجريبية. ستصل الإجابات الذكية إلى هنا عند تفعيل المحرك لاحقًا.";

export default function AstraPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "astra",
      text: "مرحبًا، أنا أسترا. كيف يمكنني أن أساعدك في تطوير فكرتك اليوم؟",
    },
  ]);

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = message.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", text },
      { id: Date.now() + 1, role: "astra", text: demoReply },
    ]);
    setMessage("");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0b0c] text-[#f4f0e7]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(198,165,106,0.12),transparent_24%),radial-gradient(circle_at_15%_82%,rgba(43,93,112,0.11),transparent_28%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-4 sm:px-8 sm:py-7">
        <div className="h-px w-full bg-gradient-to-l from-transparent via-[#c6a56a]/70 to-transparent" />
        <header className="flex items-center justify-between border-b border-white/10 py-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label="العودة إلى منصة الشرقاوي">
            <span className="grid h-8 w-8 place-items-center border border-[#c6a56a] font-serif text-lg text-[#c6a56a]">ش</span>
            <span>
              <strong className="block text-sm text-[#f4f0e7]">منصة الشرقاوي</strong>
              <small className="block text-[9px] text-white/45">استوديو الإبداع الذكي</small>
            </span>
          </Link>
          <Link href="/" className="text-xs text-[#c6a56a] transition hover:text-[#f4f0e7]">العودة للرئيسية ↗</Link>
        </header>

        <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col py-7 sm:py-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-[#c6a56a]">شات جي بي تي · 03</p>
              <h1 className="font-serif text-3xl font-normal text-[#f4f0e7] sm:text-4xl">شات جي بي تي <em className="not-italic text-[#c6a56a]">أسترا</em></h1>
            </div>
            <span className="mb-1 flex items-center gap-2 border border-[#c6a56a]/20 bg-[#c6a56a]/5 px-2.5 py-1.5 text-[9px] text-white/55"><i className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#86efac]" /> متاحة للتجربة</span>
          </div>

          <section className="flex min-h-[480px] flex-1 flex-col border border-white/10 bg-[#151516]/80 shadow-2xl shadow-black/30 backdrop-blur-sm" aria-label="محادثة أسترا">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[10px] text-white/55 sm:px-5">
              <span className="text-[#d8c292]">أسترا</span>
              <span>واجهة تجريبية · بدون اتصال API</span>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
              {messages.map((chatMessage) => (
                <div key={chatMessage.id} className={`flex ${chatMessage.role === "user" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[88%] border px-3.5 py-3 text-xs leading-7 sm:max-w-[75%] ${chatMessage.role === "user" ? "border-[#c6a56a]/25 bg-[#c6a56a]/10 text-[#ead39e]" : "border-white/10 bg-[#0d0d0e] text-white/70"}`}>
                    <span className="mb-1 block text-[9px] text-white/40">{chatMessage.role === "user" ? "أنت" : "أسترا"}</span>
                    {chatMessage.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="m-3 flex border border-white/10 bg-[#0d0d0e] focus-within:border-[#c6a56a]/60 sm:m-4">
              <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="اكتب رسالتك إلى أسترا..." aria-label="رسالتك إلى أسترا" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-xs text-white outline-none placeholder:text-white/30 sm:px-4" />
              <button type="submit" aria-label="إرسال الرسالة" className="m-1 min-w-10 bg-[#c6a56a] px-3 text-sm font-bold text-[#17130b] transition hover:bg-[#e0c486]">إرسال</button>
            </form>
          </section>
        </section>
      </div>
    </main>
  );
}