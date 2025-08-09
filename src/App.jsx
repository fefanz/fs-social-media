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
      {/* Navbar */}
      {/* ... resto do código aqui (mantém como na versão completa anterior) */}
    </div>
  );
}
