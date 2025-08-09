import React, { useMemo, useState, useEffect } from "react";
import { CONTACT_EMAIL, WHATSAPP_DEFAULT } from "./config";

const servicesCatalog = [
  { id: "social", title: "Gestão de Redes Sociais", short: "Planeamento, calendário editorial e reporting.", features: ["Planeamento estratégico e tom de voz", "Calendário editorial + design", "Gestão de comentários e mensagens", "Relatórios mensais com insights"], price: 290 },
  { id: "ads", title: "Tráfego Pago (Meta & Google)", short: "Campanhas que convertem e otimizam ROAS.", features: ["Estratégia full-funnel", "Criação de campanhas e criativos", "Otimização semanal e testes A/B", "Relatórios de performance"], price: 350 },
  { id: "web", title: "Criação de Sites", short: "Sites rápidos, responsivos e orientados a conversão.", features: ["Landing pages e websites", "Copy persuasiva e UX", "Implementação de analytics e pixels", "SEO técnico base"], price: 590 },
  { id: "seo", title: "Ranking no Google (SEO)", short: "Autoridade, conteúdo e técnica para subir posições.", features: ["Auditoria técnica e correções", "Pesquisa de keywords e gaps", "Plano editorial SEO", "Link building essencial"], price: 320 },
  { id: "content", title: "Conteúdo & Criativos", short: "Vídeos, reels, banners e copys de alta conversão.", features: ["Pacotes de reels e banners", "Guidelines de marca", "Sessões de captação (parceiros)", "Biblioteca de CTAs"], price: 240 },
  { id: "analytics", title: "Mensuração & Automação", short: "Pixel, GA4, tags e automações de lead.", features: ["Configuração GA4 + Tag Manager", "Eventos e conversões", "Integrações CRM/WhatsApp", "Dashboards de decisão"], price: 220 },
];

const fsMeanings = [
  { k: "Fast Scale", d: "Crescimento rápido com foco em performance." },
  { k: "Full Stack", d: "Domínio do funil completo: Social, Ads, Site e SEO." },
  { k: "Focused Strategy", d: "Estratégias cirúrgicas para metas claras." },
  { k: "Future-Safe", d: "Base técnica sólida para escalar com segurança." },
  { k: "Flow & Signal", d: "Menos ruído, mais sinal — decisões guiadas por dados." },
];

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium tracking-wide">
    {children}
  </span>
);

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
    <div className="mb-10 md:mb-14">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg opacity-80 max-w-2xl">{subtitle}</p>
      )}
    </div>
    {children}
  </section>
);

const NavLink = ({ href, children }) => (
  <a href={href} className="px-3 py-2 text-sm font-medium opacity-90 hover:opacity-100 hover:underline underline-offset-4">
    {children}
  </a>
);

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => { const saved = localStorage.getItem("fs_dark"); if (saved) setDark(saved === "1"); }, []);
  useEffect(() => { if (dark) document.documentElement.classList.add("dark"); else document.documentElement.classList.remove("dark"); localStorage.setItem("fs_dark", dark ? "1" : "0"); }, [dark]);
  return { dark, setDark };
}

function currency(n) { return n.toLocaleString("pt-PT", { style: "currency", currency: "EUR" }); }

export default function App() {
  const { dark, setDark } = useDarkMode();
  const [selected, setSelected] = useState(["ads", "social"]);
  const [billing, setBilling] = useState("mensal");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("Quero impulsionar as vendas com uma estratégia completa.");

  const total = useMemo(() => {
    const base = servicesCatalog.filter(s => selected.includes(s.id)).reduce((acc, s) => acc + s.price, 0);
    return billing === "anual" ? Math.round(base * 12 * 0.85) : base;
  }, [selected, billing]);

  const subject = encodeURIComponent("Pedido de Proposta — FS Social Media");
  const body = encodeURIComponent(`Olá FS Social Media,\n\nNome: ${name}\nEmail: ${email}\nTelefone: ${phone}\n\nInteresse em: ${selected.map(id => servicesCatalog.find(s => s.id === id)?.title).join(", ")}\nPlano: ${billing}\nTotal estimado: ${billing === "anual" ? currency(total) + " / ano" : currency(total) + " / mês"}\n\nMensagem:\n${msg}`);

  const mailHref = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  const waNumber = phone || WHATSAPP_DEFAULT;

  return (
    <div className="text-slate-900 bg-white dark:bg-slate-950 dark:text-slate-100">
      {/* NAVBAR */}
      <nav className="border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            FS Social Media
          </div>
          <div className="hidden md:flex items-center">
            <NavLink href="#servicos">Serviços</NavLink>
            <NavLink href="#portfolio">Portfólio</NavLink>
            <NavLink href="#calculadora">Calculadora</NavLink>
            <NavLink href="#contacto">Contacto</NavLink>
          </div>
          <button onClick={() => setDark(!dark)} className="px-3 py-1 border rounded">
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Estratégias de Social Media que geram resultados reais
        </h1>
        <p className="mt-4 text-lg opacity-80">
          Gestão de redes sociais, tráfego pago, criação de sites, SEO e muito mais.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a href="#servicos" className="px-6 py-3 bg-indigo-600 text-white rounded">Conhecer Serviços</a>
          <a href="#contacto" className="px-6 py-3 border rounded">Falar Connosco</a>
        </div>
      </section>

      {/* SERVIÇOS */}
      <Section id="servicos" title="Serviços" subtitle="Tudo o que precisa para escalar o seu negócio online">
        <div className="grid md:grid-cols-2 gap-8">
          {servicesCatalog.map(s => (
            <div key={s.id} className="border rounded-lg p-6">
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="opacity-80">{s.short}</p>
              <ul className="mt-3 list-disc list-inside text-sm opacity-90">
                {s.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <div className="mt-4 font-semibold">{currency(s.price)} / mês</div>
            </div>
          ))}
        </div>
      </Section>

      {/* PORTFÓLIO PLACEHOLDERS */}
      <Section id="portfolio" title="Estudos de Caso" subtitle="Substitua por cases reais assim que possível.">
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="rounded-2xl overflow-hidden border bg-white/60 dark:bg-slate-900/60">
              <div className="aspect-video bg-gradient-to-br from-indigo-200 to-fuchsia-200 dark:from-indigo-900/40 dark:to-fuchsia-900/40 flex items-center justify-center text-5xl font-black">FS</div>
              <div className="p-5">
                <div className="text-sm uppercase tracking-wider opacity-70">Case {i}</div>
                <h4 className="text-lg font-bold mt-1">+237% em mensagens em 60 dias</h4>
                <p className="text-sm opacity-80 mt-2">Full-funnel (Meta + Google), criativos focados em dor/ganho e landing rápida. CRO e SEO técnico.</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CALCULADORA */}
      <Section id="calculadora" title="Calculadora de Investimento" subtitle="Selecione serviços e veja o total estimado.">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {servicesCatalog.map(s => (
              <label key={s.id} className="block mb-2">
                <input
                  type="checkbox"
                  checked={selected.includes(s.id)}
                  onChange={() => setSelected(prev => prev.includes(s.id) ? prev.filter(id => id !== s.id) : [...prev, s.id])}
                />
                <span className="ml-2">{s.title}</span>
              </label>
            ))}
            <div className="mt-4">
              <label><input type="radio" checked={billing === "mensal"} onChange={() => setBilling("mensal")} /> Mensal</label>
              <label className="ml-4"><input type="radio" checked={billing === "anual"} onChange={() => setBilling("anual")} /> Anual (-15%)</label>
            </div>
            <div className="mt-4 font-bold">Total: {billing === "anual" ? `${currency(total)} / ano` : `${currency(total)} / mês`}</div>
          </div>
        </div>
      </Section>

      {/* CONTACTO */}
      <Section id="contacto" title="Fale Connosco" subtitle="Receba um plano direto ao ponto.">
        <form className="grid gap-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
          <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} className="border px-3 py-2 rounded" />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border px-3 py-2 rounded" />
          <input placeholder="Telefone" value={phone} onChange={e => setPhone(e.target.value)} className="border px-3 py-2 rounded" />
          <textarea placeholder="Mensagem" value={msg} onChange={e => setMsg(e.target.value)} className="border px-3 py-2 rounded" />
          <div className="flex gap-2">
            <a href={mailHref} className="px-6 py-3 bg-indigo-600 text-white rounded">Enviar Email</a>
            <a href={`https://api.whatsapp.com/send?phone=${encodeURIComponent(waNumber)}&text=${encodeURIComponent(msg)}`} className="px-6 py-3 border rounded">WhatsApp</a>
          </div>
        </form>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-black/5 dark:border-white/5 mt-12">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 text-sm opacity-80">
          © {new Date().getFullYear()} FS Social Media — Fast Scale • Full Stack • Focused Strategy
        </div>
      </footer>
    </div>
  );
}
