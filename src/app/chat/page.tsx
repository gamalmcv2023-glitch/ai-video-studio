"use client";

import Link from "next/link";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";

const modes = ["Chat", "Creative", "Writing", "Coding", "Analysis"];
const conversationHistory = ["فكرة إعلان سينمائي", "خطة إطلاق المنتج", "مراجعة النص الإبداعي", "هوية بصرية جديدة"];

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const welcomeMessage: Message = {
  id: 1,
  role: "assistant",
  content: "مرحبًا بك في **AURELIA ASTRA**.\n\nأنا رفيقك الإبداعي داخل منصة الشرقاوي. ابدأ بفكرة، سؤال، أو مشروع وسنرتّبه معًا.",
};

function renderInlineMarkdown(text: string) {
  return text.split(/(\*\*.*?\*\*|`.*?`)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index} className="font-semibold text-[#ead39e]">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index} className="border border-[#c6a56a]/20 bg-[#c6a56a]/10 px-1.5 py-0.5 text-[10px] text-[#ead39e]">{part.slice(1, -1)}</code>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

function MarkdownMessage({ content }: { content: string }) {
  return <div className="space-y-2">{content.split("\n").map((line, index) => {
    if (line.startsWith("- ")) return <div key={index} className="flex gap-2"><span className="text-[#c6a56a]">✦</span><span>{renderInlineMarkdown(line.slice(2))}</span></div>;
    if (line.startsWith("### ")) return <h3 key={index} className="pt-1 text-xs font-semibold text-[#ead39e]">{renderInlineMarkdown(line.slice(4))}</h3>;
    return <p key={index} className={line ? "min-h-5" : "h-1"}>{renderInlineMarkdown(line)}</p>;
  })}</div>;
}

export default function ChatPage() {
  const [activeMode, setActiveMode] = useState("Chat");
  const [activeConversation, setActiveConversation] = useState(conversationHistory[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    return () => {
      if (responseTimerRef.current) clearTimeout(responseTimerRef.current);
    };
  }, [messages, isThinking]);

  function createNewChat() {
    if (responseTimerRef.current) clearTimeout(responseTimerRef.current);
    setActiveConversation("محادثة جديدة");
    setMessages([{ ...welcomeMessage, id: Date.now() }]);
    setIsThinking(false);
    setMessage("");
  }

  function selectConversation(title: string) {
    setActiveConversation(title);
    setMessages([{ ...welcomeMessage, id: 2, content: `مرحبًا مجددًا.\n\nنستكمل هنا مساحة **${title}**. ما الخطوة التالية؟` }]);
    setIsThinking(false);
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = message.trim();
    if (!text || isThinking) return;

    setMessages((current) => [...current, { id: Date.now(), role: "user", content: text }]);
    setMessage("");
    setIsThinking(true);
    responseTimerRef.current = setTimeout(() => {
      setMessages((current) => [...current, {
        id: Date.now(),
        role: "assistant",
        content: `فهمت اتجاهك في وضع **${activeMode}**.\n\n- سأحوّل الفكرة إلى خطوات واضحة\n- سأحافظ على نبرة ${activeMode === "Creative" ? "جريئة وخيالية" : "دقيقة ومنظمة"}\n- هذه إجابة تجريبية للواجهة، وسيتم ربط المحرك لاحقًا`,
      }]);
      setIsThinking(false);
    }, 700);
  }

  async function copyMessage(messageToCopy: Message) {
    await navigator.clipboard.writeText(messageToCopy.content);
    setCopiedId(messageToCopy.id);
    window.setTimeout(() => setCopiedId(null), 1800);
  }

  return (
    <main className="studio-shell min-h-screen overflow-hidden bg-[#0a0a0b] text-[#f4f0e7]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_78%_8%,rgba(198,165,106,0.13),transparent_24%),radial-gradient(circle_at_18%_82%,rgba(38,86,107,0.12),transparent_29%)]" />
      <div className="relative mx-auto flex min-h-screen w-full min-w-0 max-w-7xl flex-col px-3 py-3 sm:px-6 sm:py-5">
        <div className="h-px bg-gradient-to-l from-transparent via-[#c6a56a]/80 to-transparent" />
        <header className="flex min-w-0 items-center justify-between gap-3 border-b border-white/10 py-3 sm:py-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label="العودة إلى منصة الشرقاوي">
            <span className="grid h-8 w-8 place-items-center border border-[#c6a56a] font-serif text-lg text-[#c6a56a]">ش</span>
            <span><strong className="block text-xs sm:text-sm">منصة الشرقاوي</strong><small className="block text-[8px] text-white/40 sm:text-[9px]">استوديو الإبداع الذكي</small></span>
          </Link>
          <Link href="/" className="text-[10px] text-[#c6a56a] transition hover:text-white sm:text-xs">العودة للرئيسية ↗</Link>
        </header>

        <section className="mx-auto flex w-full min-w-0 max-w-6xl flex-1 flex-col py-4 sm:py-7">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative grid h-12 w-12 place-items-center rounded-full border border-[#c6a56a]/65 bg-[#c6a56a]/10 shadow-[0_0_28px_rgba(198,165,106,0.16)]"><span className="font-serif text-2xl text-[#e7c985]">A</span><i className="absolute inset-1 rounded-full border border-[#80b5c5]/25" /></div>
              <div><p className="text-[9px] uppercase tracking-[0.3em] text-[#c6a56a]">AI CHAT STUDIO</p><h1 className="mt-1 font-serif text-xl tracking-wide text-[#f4f0e7] sm:text-2xl">AURELIA ASTRA</h1></div>
            </div>
            <span className="border border-[#c6a56a]/20 bg-[#c6a56a]/5 px-2.5 py-1.5 text-[9px] text-white/45">واجهة تجريبية · بدون API</span>
          </div>

          <div className="grid min-w-0 min-h-[calc(100vh-170px)] flex-1 gap-3 lg:grid-cols-[210px_minmax(0,1fr)]">
            <aside className="order-2 flex max-h-32 flex-col border border-white/10 bg-[#121213]/85 p-3 lg:order-1 lg:max-h-none" aria-label="المحادثات السابقة">
              <button type="button" onClick={createNewChat} className="mb-3 flex items-center justify-center gap-2 border border-[#c6a56a]/60 bg-[#c6a56a] px-3 py-2.5 text-[11px] font-bold text-[#17130b] transition hover:bg-[#e0c486]">+ محادثة جديدة</button>
              <p className="mb-2 text-[9px] uppercase tracking-[0.22em] text-white/35">المحادثات السابقة</p>
              <div className="flex gap-1.5 overflow-x-auto lg:block lg:space-y-1.5">{conversationHistory.map((title) => <button key={title} type="button" onClick={() => selectConversation(title)} className={`block min-w-max border px-2.5 py-2 text-right text-[10px] transition lg:w-full ${activeConversation === title ? "border-[#c6a56a]/35 bg-[#c6a56a]/10 text-[#ead39e]" : "border-transparent text-white/45 hover:border-white/10 hover:text-white/70"}`}>{title}</button>)}</div>
            </aside>

            <section className="order-1 flex min-h-[520px] min-w-0 flex-col border border-white/10 bg-[#141415]/85 shadow-2xl shadow-black/30 lg:order-2 lg:min-h-[580px]" aria-label="Aurelia Astra chat">
              <div className="border-b border-white/10 px-3 py-3 sm:px-5">
                <div className="mb-3 flex items-center justify-between"><div><p className="text-[9px] text-white/35">المحادثة الحالية</p><h2 className="mt-1 text-xs font-semibold text-[#ead39e]">{activeConversation}</h2></div><span className="flex items-center gap-1.5 text-[9px] text-emerald-300/75"><i className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#86efac]" /> Online</span></div>
                <div className="flex gap-1 overflow-x-auto border-b border-white/5 pb-1">{modes.map((mode) => <button key={mode} type="button" onClick={() => setActiveMode(mode)} className={`whitespace-nowrap border-b-2 px-2.5 py-1.5 text-[10px] transition ${activeMode === mode ? "border-[#c6a56a] text-[#ead39e]" : "border-transparent text-white/40 hover:text-white/70"}`}>{mode}</button>)}</div>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-6 sm:py-6">{messages.map((chatMessage) => <div key={chatMessage.id} className={`mb-5 flex ${chatMessage.role === "user" ? "justify-start" : "justify-end"}`}><div className={`max-w-[92%] sm:max-w-[78%] ${chatMessage.role === "user" ? "items-start" : "items-end"} flex flex-col`}><div className={`border px-3.5 py-3 text-xs leading-6 ${chatMessage.role === "user" ? "border-[#c6a56a]/20 bg-[#c6a56a]/10 text-[#e9d39a]" : "border-white/10 bg-[#0c0c0d] text-white/70"}`}><span className="mb-2 block text-[9px] text-white/35">{chatMessage.role === "user" ? "أنت" : "AURELIA ASTRA"}</span>{chatMessage.role === "assistant" ? <MarkdownMessage content={chatMessage.content} /> : <p className="whitespace-pre-wrap">{chatMessage.content}</p>}</div>{chatMessage.role === "assistant" && <button type="button" onClick={() => copyMessage(chatMessage)} className="mt-1.5 text-[9px] text-white/35 transition hover:text-[#ead39e]">{copiedId === chatMessage.id ? "تم النسخ ✓" : "نسخ الرد"}</button>}</div></div>)}{isThinking && <div className="flex justify-end"><div className="border border-white/10 bg-[#0c0c0d] px-3.5 py-3 text-[10px] text-white/45"><span className="mr-2 inline-flex gap-1 align-middle"><i className="h-1 w-1 animate-pulse rounded-full bg-[#c6a56a]" /><i className="h-1 w-1 animate-pulse rounded-full bg-[#c6a56a] [animation-delay:150ms]" /><i className="h-1 w-1 animate-pulse rounded-full bg-[#c6a56a] [animation-delay:300ms]" /></span>جاري التفكير...</div></div>}<div ref={messagesEndRef} /></div>

              <form onSubmit={sendMessage} className="m-3 flex items-end border border-white/10 bg-[#0c0c0d] focus-within:border-[#c6a56a]/60 sm:m-4"><textarea value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} rows={1} placeholder="اكتب رسالتك إلى أسترا..." aria-label="رسالتك إلى أسترا" className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-3 py-3 text-xs leading-5 text-white outline-none placeholder:text-white/25 sm:px-4" /><button type="submit" disabled={!message.trim() || isThinking} aria-label="إرسال الرسالة" className="m-1 min-w-11 bg-[#c6a56a] px-3 py-2.5 text-sm font-bold text-[#17130b] transition hover:bg-[#e0c486] disabled:cursor-not-allowed disabled:opacity-40">↑</button></form>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}