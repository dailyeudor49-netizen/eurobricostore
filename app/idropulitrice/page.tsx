
"use client";

import React, { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Shield,
  CheckCircle,
  Zap,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Droplets,
  Gauge,
  Wrench,
  Award,
  BadgeCheck,
  Sparkles,
  Users,
  Gift,
  Home,
  Star,
  Truck,
  RotateCcw,
  CreditCard,
  Package,
  ArrowRight,
  Phone,
  MapPin,
  User,
} from 'lucide-react';

// --- STAR RATING ---
function StarRating({ rating = 5, size = 14 }: { rating?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="fill-[#f5a623] text-[#f5a623]" style={{ width: size, height: size }} />
      ))}
    </div>
  );
}

// --- IMAGE CAROUSEL ---
function ImageCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="w-full overflow-hidden">
      <div className="relative bg-[#f9f9f9] border border-gray-200 rounded-lg p-4 md:p-8 mb-3 overflow-hidden">
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          <span className="bg-[#e74c3c] text-white text-xs font-bold px-2.5 py-1 rounded">-13%</span>
          <span className="bg-[#67a536] text-white text-xs font-bold px-2.5 py-1 rounded">BESTSELLER</span>
        </div>
        <img
          src={images[current].src}
          alt={images[current].alt}
          className="w-full max-w-[280px] md:max-w-md mx-auto aspect-square object-contain"
        />
        <button
          onClick={() => setCurrent(current === 0 ? images.length - 1 : current - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Immagine precedente"
        >
          <ChevronLeft className="w-5 h-5 text-[#333]" />
        </button>
        <button
          onClick={() => setCurrent(current === images.length - 1 ? 0 : current + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Immagine successiva"
        >
          <ChevronRight className="w-5 h-5 text-[#333]" />
        </button>
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded">
          {current + 1} / {images.length}
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`flex-shrink-0 w-16 h-16 rounded-md border-2 overflow-hidden transition-all ${
              i === current ? 'border-[#67a536] shadow-md' : 'border-gray-200 opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-contain bg-[#f9f9f9]" />
          </button>
        ))}
      </div>
    </div>
  );
}

// --- MAIN PAGE ---
export default function IdropulitricePage() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ nome: '', indirizzo: '', telefono: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyCTA(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    // Simulate order submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormLoading(false);
    setFormSubmitted(true);
  };

  return (
    <div className="idro-page min-h-screen bg-white text-[#333] font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;600;700;900&display=swap');
        html, body { scroll-behavior: smooth; overflow-x: hidden; max-width: 100vw; width: 100%; }
        section { scroll-margin-top: 120px; }
        body { font-family: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif; }
        *, *::before, *::after { box-sizing: border-box; }
        img { max-width: 100%; height: auto; }
        .idro-page { width: 100%; max-width: 100vw; overflow-x: hidden; }
        .lm-green { color: #67a536; }
        .lm-green-bg { background-color: #67a536; }
        .lm-green-bg-hover:hover { background-color: #5a9130; }
        .lm-green-border { border-color: #67a536; }
        .lm-green-light-bg { background-color: #f0f7eb; }
        .lm-orange { color: #e67e22; }
        .lm-orange-bg { background-color: #e67e22; }
      `}} />

      {/* === TOP BAR === */}
      <div className="bg-[#67a536] text-white text-center py-2 px-3 md:px-4 text-[10px] md:text-sm font-semibold tracking-wide">
        <span>Spedizione GRATUITA</span>
        <span className="mx-1 md:mx-2">·</span>
        <span>Reso 30 giorni</span>
        <span className="mx-1 md:mx-2">·</span>
        <span>Pagamento alla consegna</span>
      </div>

      {/* === HEADER === */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-3 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 lm-green-bg rounded flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold text-[#333]">
                Euro<span className="lm-green">Brico</span>
              </span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#666]">
            <button onClick={() => scrollTo('caratteristiche')} className="hover:text-[#67a536] transition-colors">Caratteristiche</button>
            <button onClick={() => scrollTo('accessori')} className="hover:text-[#67a536] transition-colors">Accessori</button>
            <button onClick={() => scrollTo('recensioni')} className="hover:text-[#67a536] transition-colors">Recensioni</button>
            <button onClick={() => scrollTo('ordina')} className="hover:text-[#67a536] transition-colors">Ordina</button>
          </nav>
          <button
            onClick={() => scrollTo('ordina')}
            className="lm-green-bg lm-green-bg-hover text-white px-4 md:px-5 py-2 md:py-2.5 rounded-md font-bold text-xs md:text-sm transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Ordina Ora</span>
          </button>
        </div>
      </header>

      <main className="w-full overflow-x-hidden">
        {/* === BREADCRUMB === */}
        <div className="bg-[#f5f5f5] border-b border-gray-200 py-2.5 px-3 md:px-6 overflow-hidden w-full">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs text-[#999] overflow-hidden">
            <span>Home</span>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="hidden sm:inline">Giardino e Esterni</span>
            <span className="sm:hidden">Giardino</span>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span>Idropulitrici</span>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-[#333] font-semibold truncate">Karex K5 Power Control Home</span>
          </div>
        </div>

        {/* === PRODUCT HERO === */}
        <section className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-10">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 overflow-hidden">
            {/* Left — Image Carousel */}
            <div className="min-w-0">
              <ImageCarousel
                images={[
                  { src: "/images/idropulitrice/carosello/1.webp", alt: "Karex K5 Power Control Home — Kit completo con lavasuperfici e accessori" },
                  { src: "/images/idropulitrice/carosello/2.jpg", alt: "Karex K5 — Vista laterale con lavasuperfici T5" },
                  { src: "/images/idropulitrice/carosello/3.jpg", alt: "Karex K5 — Vista posteriore con avvolgitubo" },
                  { src: "/images/idropulitrice/carosello/4.jpg", alt: "Karex K5 — Vista laterale completa" },
                  { src: "/images/idropulitrice/carosello/5.jpg", alt: "Karex K5 — Dettaglio tubo alta pressione 10m" },
                  { src: "/images/idropulitrice/carosello/6.jpg", alt: "Karex K5 — Vista d'insieme con lancia e lavasuperfici" },
                  { src: "/images/idropulitrice/carosello/7.jpg", alt: "Karex K5 — Kit completo accessori inclusi" },
                  { src: "/images/idropulitrice/carosello/8.jpg", alt: "Karex K5 — Kit completo dall'alto" },
                  { src: "/images/idropulitrice/carosello/9.jpg", alt: "Karex K5 — Pulizia terrazza in legno in azione" },
                  { src: "/images/idropulitrice/carosello/10.jpg", alt: "Karex K5 — Dettaglio pistola Power Control e lance" },
                ]}
              />
              {/* Image trust */}
              <div className="flex items-center justify-center gap-3 md:gap-4 mt-3 md:mt-4 text-[10px] md:text-xs text-[#999]">
                <span className="flex items-center gap-1"><BadgeCheck className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#67a536]" /> Prodotto Originale</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#67a536]" /> Garanzia Ufficiale</span>
              </div>
            </div>

            {/* Right — Product Info */}
            <div className="min-w-0 overflow-hidden">
              {/* Brand */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-white bg-[#f5a623] px-2 py-0.5 rounded uppercase">Karex</span>
                <span className="text-xs text-[#999]">Cod. 59400</span>
              </div>

              {/* Title */}
              <h1 className="text-xl md:text-3xl font-bold text-[#333] leading-tight mb-3">
                Karex K5 Power Control Home — Idropulitrice Semi-Professionale con Lavasuperfici T5
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <StarRating />
                <span className="text-sm font-semibold text-[#333]">7,8/10</span>
                <span className="text-sm text-[#999]">(381 recensioni)</span>
              </div>

              {/* Key specs pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 md:flex md:flex-wrap md:gap-2 mb-4 md:mb-5">
                {[
                  { label: "145 bar", icon: Gauge },
                  { label: "500 L/h", icon: Droplets },
                  { label: "2.100W", icon: Zap },
                  { label: "10m tubo", icon: Wrench },
                ].map(({ label, icon: Icon }, i) => (
                  <span key={i} className="inline-flex items-center justify-center gap-1 md:gap-1.5 bg-[#f0f7eb] text-[#67a536] text-[10px] md:text-xs font-bold px-1.5 md:px-3 py-1 md:py-1.5 rounded-full border border-[#67a536]/20">
                    <Icon className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                    {label}
                  </span>
                ))}
              </div>

              {/* Short description */}
              <p className="text-xs md:text-sm text-[#666] leading-relaxed mb-4 md:mb-5">
                La potenza semi-professionale Karex a casa tua. <strong>145 bar</strong> e <strong>500 litri/ora</strong> con motore a induzione raffreddato ad acqua per una durata fino a 5 volte superiore.
                Include lavasuperfici T5, pistola Power Control con display e 3 omaggi esclusivi.
              </p>

              {/* Price Block */}
              <div className="bg-[#f9f9f9] border border-gray-200 rounded-lg p-4 md:p-5 mb-5">
                <div className="flex items-baseline gap-2 md:gap-3 mb-1 flex-wrap">
                  <span className="text-2xl md:text-4xl font-black text-[#e74c3c]">€365,96</span>
                  <span className="text-base md:text-lg text-[#999] line-through">€422,88</span>
                  <span className="bg-[#e74c3c] text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded">-13%</span>
                </div>
                <p className="text-[10px] md:text-xs text-[#999] mb-3">IVA inclusa · Risparmi €56,92</p>

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1.5 sm:gap-x-4 sm:gap-y-1 text-[11px] md:text-xs text-[#666] mb-4">
                  <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-[#67a536] flex-shrink-0" /> Spedizione gratuita</span>
                  <span className="flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5 text-[#67a536] flex-shrink-0" /> Reso 30 giorni</span>
                  <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-[#67a536] flex-shrink-0" /> Pagamento alla consegna</span>
                </div>

                {/* Stock */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-[#67a536] rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-[#67a536]">Disponibile</span>
                  <span className="text-xs text-[#999]">— Solo 81 pezzi in magazzino</span>
                </div>

                {/* CTA */}
                <button
                  onClick={() => scrollTo('ordina')}
                  className="w-full lm-green-bg lm-green-bg-hover text-white font-bold text-sm md:text-base py-3 md:py-3.5 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5 flex-shrink-0" />
                  <span>Ordina Ora — Paghi alla Consegna</span>
                </button>
                <p className="text-center text-xs text-[#999] mt-2">Consegna stimata: 3-5 giorni lavorativi</p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-2.5">
                {[
                  "145 BAR di pressione — elimina qualsiasi incrostazione",
                  "Motore a induzione raffreddato ad acqua — dura fino a 5x di più",
                  "Lavasuperfici T5 incluso (valore €80)",
                  "Pistola Power Control con display pressione integrato",
                  "3 Omaggi esclusivi: telo, panno camoscio, kit idrico 15m",
                  "Prodotta in Italia — Garanzia ufficiale Karex",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#67a536] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#333]">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* === SERVICE BADGES BAR === */}
        <section className="bg-[#f5f5f5] border-y border-gray-200 py-4 md:py-6 px-3 md:px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { icon: Truck, title: "Spedizione Gratuita", desc: "In tutta Italia" },
              { icon: RotateCcw, title: "Reso Facile", desc: "Entro 30 giorni" },
              { icon: Shield, title: "Garanzia Karex", desc: "Assistenza ufficiale" },
              { icon: CreditCard, title: "Paga alla Consegna", desc: "Nessun rischio" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3 min-w-0">
                <div className="w-8 h-8 md:w-10 md:h-10 lm-green-bg rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-bold text-[#333] truncate">{title}</p>
                  <p className="text-[10px] md:text-xs text-[#999]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === WHY THIS PRODUCT === */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-3">
              Perché scegliere la Karex K5 Power Control?
            </h2>
            <p className="text-sm text-[#999] max-w-2xl mx-auto">
              Non accontentarti di un'idropulitrice qualsiasi. La K5 è la scelta di chi vuole risultati professionali senza chiamare nessuno.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "💸",
                title: "Basta pagare il professionista",
                desc: "Ogni anno butti €200-400 per far pulire terrazza e vialetto. Con la K5 lo fai da solo, in metà tempo, con risultati migliori. Si ripaga al primo utilizzo.",
              },
              {
                icon: "😩",
                title: "Basta faticare con secchio e spazzolone",
                desc: "Muschio, calcare, sporco incrostato: non vanno via con l'olio di gomito. Con 145 bar di pressione li dissolvi in secondi. Schiena salva.",
              },
              {
                icon: "🗑️",
                title: "Basta idropulitrici che si rompono",
                desc: "Le economiche durano 2-3 anni. Il motore a induzione raffreddato ad acqua della K5 è progettato per durare 8-12 anni. Stop agli acquisti ripetuti.",
              },
            ].map(({ icon, title, desc }, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-base font-bold text-[#333] mb-2">{title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* === FEATURES === */}
        <section id="caratteristiche" className="bg-[#f5f5f5] py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#67a536] text-white text-xs font-bold px-3 py-1 rounded mb-3 uppercase tracking-wider">Caratteristiche Top</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#333]">
                Prestazioni Semi-Professionali per la Tua Casa
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: Gauge,
                  title: "145 BAR di Pressione",
                  desc: "Pressione massima di 145 bar con esercizio costante a 125 bar. Elimina muschio, calcare, grasso e sporco incrostato da anni come se fosse burro.",
                },
                {
                  icon: Droplets,
                  title: "500 Litri/Ora di Portata",
                  desc: "Flusso d'acqua potente che risciacqua e trascina via lo sporco dissolto. Nessun residuo, nessuna traccia. Solo superfici perfettamente pulite.",
                },
                {
                  icon: Zap,
                  title: "Motore 2.100W Raffreddato ad Acqua",
                  desc: "L'esclusivo sistema Karex fa circolare l'acqua attorno al motore. Durata fino a 5x superiore rispetto ai motori universali. Silenzioso e potente.",
                },
                {
                  icon: Wrench,
                  title: "Pompa 3 Pistoni in Alluminio",
                  desc: "Testata in alluminio con 3 pistoni assiali. Costruzione di livello professionale: zero manutenzione, massima affidabilità per anni.",
                },
                {
                  icon: Home,
                  title: "Lavasuperfici T5 Incluso",
                  desc: "Pulizia uniforme di terrazze e pavimentazioni senza schizzi. Copre grandi aree in un terzo del tempo rispetto alla lancia tradizionale. Vale €80.",
                },
                {
                  icon: Sparkles,
                  title: "Pistola Power Control",
                  desc: "Display integrato che mostra la pressione selezionata in tempo reale. Regoli la potenza in base alla superficie. Controllo totale, come un professionista.",
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 lm-green-light-bg rounded-lg flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-[#67a536]" />
                  </div>
                  <h3 className="text-base font-bold text-[#333] mb-2">{title}</h3>
                  <p className="text-sm text-[#666] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === USE CASES === */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-10">
            Ideale per ogni superficie di casa
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { emoji: "🏠", title: "Terrazza e Patio", desc: "Via muschio, alghe e macchie nere. Come appena posata." },
              { emoji: "🚗", title: "Auto e Moto", desc: "Lavaggio professionale a casa. Zero graffi, massima brillantezza." },
              { emoji: "🧱", title: "Vialetti e Muri", desc: "Pietra, mattoni, cemento: colore originale in pochi minuti." },
              { emoji: "🪑", title: "Recinzioni e Mobili", desc: "Legno, PVC, metallo. Rinnova tutto quello che il tempo ha rovinato." },
            ].map(({ emoji, title, desc }, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{emoji}</div>
                <h3 className="text-sm font-bold text-[#333] mb-1">{title}</h3>
                <p className="text-xs text-[#666]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* === ACCESSORIES === */}
        <section id="accessori" className="bg-[#f5f5f5] py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#e67e22] text-white text-xs font-bold px-3 py-1 rounded mb-3 uppercase tracking-wider">Tutto Incluso</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#333]">
                Accessori in Dotazione e Omaggi Esclusivi
              </h2>
              <p className="text-sm text-[#999] mt-2">Non devi comprare nient'altro. Apri la scatola e sei pronto a partire.</p>
            </div>

            {/* Standard accessories */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[
                { name: "Lavasuperfici T5", desc: "Pulizia uniforme di terrazze e pavimenti senza schizzi.", tag: "Valore ~€80" },
                { name: "Pistola Power Control", desc: "Con display pressione integrato per regolazione immediata.", tag: "Esclusiva K5" },
                { name: "Tubo Alta Pressione 10m", desc: "10 metri di raggio d'azione per raggiungere ogni angolo.", tag: "10 metri" },
                { name: "Lancia Vario Power", desc: "Getto regolabile dalla pulizia delicata alla massima potenza.", tag: "Multi-uso" },
                { name: "Lancia Ugello Rotante", desc: "Getto puntiforme rotante per le incrostazioni più ostinate.", tag: "Max Potenza" },
                { name: "Detergente Multisuperficie", desc: "Flacone da 1 litro detergente universale Karex pronto all'uso.", tag: "1 Litro" },
              ].map(({ name, desc, tag }, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3 shadow-sm">
                  <div className="w-8 h-8 lm-green-light-bg rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Package className="w-4 h-4 text-[#67a536]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-[#333]">{name}</h4>
                      <span className="text-[10px] font-bold bg-[#f0f7eb] text-[#67a536] px-2 py-0.5 rounded">{tag}</span>
                    </div>
                    <p className="text-xs text-[#666]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Exclusive Gifts */}
            <div className="bg-white border-2 border-[#e67e22] rounded-lg p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <Gift className="w-5 h-5 text-[#e67e22]" />
                <h3 className="text-lg font-bold text-[#333]">3 Omaggi Esclusivi — Solo con Ordine Online</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { icon: Shield, name: "Telo di Copertura", desc: "Proteggi la tua K5 da polvere, sole e pioggia. Mantienila come nuova per anni." },
                  { icon: Sparkles, name: "Panno in Camoscio", desc: "Per asciugare e lucidare le superfici dopo il lavaggio. Finitura impeccabile." },
                  { icon: Wrench, name: "Kit Collegamento Idrico", desc: "Tubo giallo 15m + raccordi rapidi. Colleghi la K5 al rubinetto in 30 secondi." },
                ].map(({ icon: Icon, name, desc }, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 mx-auto bg-[#fef3e2] border border-[#e67e22]/20 rounded-full flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-[#e67e22]" />
                    </div>
                    <h4 className="text-sm font-bold text-[#333] mb-1">{name}</h4>
                    <p className="text-xs text-[#666]">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-center mt-5 text-sm font-bold text-[#e67e22]">
                Valore omaggi: oltre €60 — GRATIS con il tuo ordine
              </p>
            </div>
          </div>
        </section>

        {/* === COMPARISON === */}
        <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-3">
            Karex K5 vs Idropulitrici Economiche
          </h2>
          <p className="text-sm text-[#999] text-center mb-8">I numeri parlano chiaro.</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f5f5f5]">
                  <th className="text-left py-3 px-4 text-sm font-bold text-[#666] border border-gray-200">Caratteristica</th>
                  <th className="py-3 px-4 text-sm font-bold text-[#67a536] text-center border border-gray-200 bg-[#f0f7eb]">Karex K5</th>
                  <th className="py-3 px-4 text-sm font-bold text-[#999] text-center border border-gray-200">Economica</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Pressione", "145 BAR", "90-110 BAR"],
                  ["Portata", "500 L/h", "300-350 L/h"],
                  ["Motore", "Induzione raffreddato ad acqua", "Universale"],
                  ["Testata pompa", "Alluminio", "Plastica"],
                  ["Tubo alta pressione", "10 metri", "5-6 metri"],
                  ["Lavasuperfici", "T5 INCLUSO", "Non incluso"],
                  ["Durata stimata", "8-12 anni", "2-3 anni"],
                  ["Regolazione pressione", "Display digitale", "Nessuna"],
                ].map(([feat, k5, cheap], i) => (
                  <tr key={i}>
                    <td className="py-3 px-4 text-sm font-semibold text-[#333] border border-gray-200">{feat}</td>
                    <td className="py-3 px-4 text-sm font-bold text-[#67a536] text-center border border-gray-200 bg-[#f0f7eb]/50">{k5}</td>
                    <td className="py-3 px-4 text-sm text-[#999] text-center border border-gray-200">{cheap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#f0f7eb] border border-[#67a536]/20 rounded-lg p-5 mt-6 text-center">
            <p className="text-sm text-[#666] mb-1">Idropulitrice economica €150 ÷ 2 anni = <strong className="text-[#e74c3c]">€75/anno</strong></p>
            <p className="text-sm text-[#666] mb-2">Karex K5 €366 ÷ 10 anni = <strong className="text-[#67a536]">€36/anno</strong></p>
            <p className="text-base font-bold text-[#67a536]">Risparmi il 52% sul lungo periodo. La K5 si ripaga da sola.</p>
          </div>
        </section>

        {/* === TECHNICAL SPECS === */}
        <section className="bg-[#f5f5f5] py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-8">
              Scheda Tecnica
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {[
                ["Pressione massima", "145 bar"],
                ["Pressione di esercizio", "125 bar"],
                ["Portata massima", "500 L/h (8,3 L/min)"],
                ["Potenza motore", "2.100 W"],
                ["Tipo motore", "Induzione raffreddato ad acqua"],
                ["Tensione", "230V monofase"],
                ["Regime motore", "2.800 RPM"],
                ["Pompa", "3 pistoni assiali — testata in alluminio"],
                ["Tubo alta pressione", "10 m"],
                ["Dimensioni", "41 × 30,5 × 78 cm"],
                ["Peso", "14,8 kg"],
                ["Prodotto in", "Italia"],
              ].map(([label, value], i) => (
                <div key={i} className={`flex justify-between items-center py-3 px-5 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'} border-b border-gray-100 last:border-0`}>
                  <span className="text-[#666]">{label}</span>
                  <span className="font-bold text-[#333]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === REVIEWS === */}
        <section id="recensioni" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-2">
              Cosa dicono i clienti
            </h2>
            <div className="flex items-center justify-center gap-2">
              <StarRating size={18} />
              <span className="text-sm font-bold text-[#333]">7,8/10</span>
              <span className="text-sm text-[#999]">· 381 recensioni verificate</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: "Marco T.",
                location: "Verona",
                date: "12 mar 2024",
                text: "Ho pulito 80mq di terrazza in meno di un'ora. Con il secchio ci avrei messo un weekend intero. La differenza è IMPRESSIONANTE, sembra nuova. Il lavasuperfici è uno spettacolo.",
                image: "/images/idropulitrice/recensioni/rec1.jpg",
              },
              {
                name: "Laura B.",
                location: "Roma",
                date: "28 feb 2024",
                text: "Il mio vialetto era nero di muschio dopo 3 anni. Con la K5 è tornato color originale. Il vicino è rimasto a bocca aperta e mi ha chiesto di prestarla. La consiglio a tutti!",
                image: "/images/idropulitrice/recensioni/rec2.jpg",
              },
              {
                name: "Giuseppe R.",
                location: "Napoli",
                date: "15 gen 2024",
                text: "Alla terza idropulitrice economica rotta in 5 anni, ho preso la K5. Potenza su un altro livello. Il motore raffreddato ad acqua è silenziosissimo. Non torno più indietro.",
                image: "/images/idropulitrice/recensioni/rec3.jpg",
              },
              {
                name: "Francesca M.",
                location: "Milano",
                date: "3 mar 2024",
                text: "Finalmente riesco a lavare l'auto a casa come all'autolavaggio! La pistola Power Control è geniale: regolo la pressione per non rovinare la vernice. Qualità Karex al top.",
                image: "/images/idropulitrice/recensioni/rec4.jpg",
              },
              {
                name: "Antonio D.",
                location: "Bari",
                date: "20 feb 2024",
                text: "Il kit di omaggi è stato una bella sorpresa. Il tubo da 15m per collegare al rubinetto mi ha risolto un problema. Macchina seria, ci vuole questo per lavorare bene.",
                image: "/images/idropulitrice/recensioni/rec5.webp",
              },
              {
                name: "Simona C.",
                location: "Firenze",
                date: "8 gen 2024",
                text: "Ho risparmiato €350 che avrei dato al giardiniere per pulire il terrazzo. In un pomeriggio ho fatto tutto da sola, facilissima da usare. Si ripaga al primo utilizzo.",
                image: "/images/idropulitrice/recensioni/rec6.webp",
              },
              {
                name: "Roberto L.",
                location: "Torino",
                date: "5 mar 2024",
                text: "Il tubo alta pressione è ben organizzato sulla macchina, tutto compatto e ordinato. La qualità costruttiva si vede e si sente. Karex non delude mai.",
                image: "/images/idropulitrice/recensioni/rec7.webp",
              },
              {
                name: "Paolo V.",
                location: "Catania",
                date: "18 feb 2024",
                text: "L'ugello rotante è devastante sul muschio tra le fughe. Ho pulito tutto il vialetto senza fatica. Guardate la differenza nella foto, parla da sola!",
                image: "/images/idropulitrice/recensioni/rec8.jpg",
              },
              {
                name: "Giovanni M.",
                location: "Padova",
                date: "22 gen 2024",
                text: "Il lavasuperfici T5 è fantastico per le scale e i pavimenti esterni. Pulisce uniformemente senza schizzi. Molto meglio della lancia classica per le superfici grandi.",
                image: "/images/idropulitrice/recensioni/rec9.jpg",
              },
            ].map(({ name, location, date, text, image }, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48 bg-[#f5f5f5] overflow-hidden">
                  <img
                    src={image}
                    alt={`Recensione di ${name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-xs font-bold text-[#67a536] px-2 py-0.5 rounded flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" /> Foto verificata
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <StarRating />
                    <span className="text-xs text-[#999]">{date}</span>
                  </div>
                  <p className="text-sm text-[#333] leading-relaxed mb-4">"{text}"</p>
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <div className="w-8 h-8 bg-[#f0f7eb] rounded-full flex items-center justify-center">
                      <span className="text-[#67a536] font-bold text-xs">{name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#333]">{name}</p>
                      <p className="text-xs text-[#999]">{location} · Acquisto verificato ✓</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === ORDER SECTION WITH FORM === */}
        <section id="ordina" className="bg-[#f5f5f5] py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
              {/* Header */}
              <div className="lm-green-bg py-4 px-6 text-center">
                <p className="text-white font-bold text-lg">Ordina la Karex K5 Power Control Home</p>
                <p className="text-white/80 text-sm">Pagamento in contrassegno alla consegna · Spedizione gratuita</p>
              </div>

              <div className="p-6 md:p-8">
                {/* Product summary */}
                <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="w-20 h-20 bg-[#f9f9f9] border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src="/images/idropulitrice/carosello/1.webp"
                      alt="Karex K5"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#333] mb-1">Karex K5 Power Control Home</h3>
                    <p className="text-xs text-[#999] mb-2">145 bar · 500 L/h · Lavasuperfici T5 incluso</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#e74c3c]">€365,96</span>
                      <span className="text-sm text-[#999] line-through">€422,88</span>
                    </div>
                  </div>
                </div>

                {/* What you get */}
                <div className="mb-6">
                  <p className="text-sm font-bold text-[#333] mb-3">Il tuo ordine include:</p>
                  <div className="space-y-2">
                    {[
                      "Idropulitrice Karex K5 Power Control Home",
                      "Lavasuperfici T5 con tubo prolunga",
                      "Pistola Power Control con display",
                      "Tubo alta pressione 10 metri",
                      "Lancia Vario Power + Lancia Ugello Rotante",
                      "Detergente multisuperficie 1 litro",
                      "🎁 OMAGGIO: Telo di copertura",
                      "🎁 OMAGGIO: Panno in camoscio",
                      "🎁 OMAGGIO: Kit idrico (tubo 15m + raccordi)",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#67a536] flex-shrink-0" />
                        <span className={`text-sm ${item.startsWith('🎁') ? 'font-bold text-[#e67e22]' : 'text-[#333]'}`}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment info */}
                <div className="bg-[#f0f7eb] border border-[#67a536]/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5 text-[#67a536]" />
                    <span className="text-sm font-bold text-[#333]">Pagamento in Contrassegno</span>
                  </div>
                  <p className="text-xs text-[#666]">Paghi direttamente al corriere alla consegna. Nessun pagamento anticipato richiesto. Zero rischi per te.</p>
                </div>

                {formSubmitted ? (
                  /* Success Message */
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto bg-[#f0f7eb] rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-[#67a536]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#333] mb-2">Ordine Ricevuto!</h3>
                    <p className="text-sm text-[#666] mb-4">
                      Grazie per il tuo ordine. Riceverai una chiamata di conferma entro 24 ore al numero che hai indicato.
                    </p>
                    <div className="bg-[#f9f9f9] border border-gray-200 rounded-lg p-4 text-left">
                      <p className="text-xs text-[#999] mb-1">Riepilogo:</p>
                      <p className="text-sm font-bold text-[#333]">{formData.nome}</p>
                      <p className="text-sm text-[#666]">{formData.indirizzo}</p>
                      <p className="text-sm text-[#666]">{formData.telefono}</p>
                      <p className="text-sm font-bold text-[#e74c3c] mt-2">Totale: €365,96 — Pagamento alla consegna</p>
                    </div>
                  </div>
                ) : (
                  /* Order Form */
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-[#333] mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <User className="w-4 h-4 text-[#67a536]" />
                          Nome e Cognome
                        </span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        placeholder="Es. Mario Rossi"
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#67a536] focus:ring-2 focus:ring-[#67a536]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#333] mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#67a536]" />
                          Indirizzo Completo
                        </span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.indirizzo}
                        onChange={(e) => setFormData({ ...formData, indirizzo: e.target.value })}
                        placeholder="Es. Via Roma 15, 20100 Milano (MI)"
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#67a536] focus:ring-2 focus:ring-[#67a536]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#333] mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-4 h-4 text-[#67a536]" />
                          Numero di Telefono
                        </span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="Es. 333 1234567"
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#67a536] focus:ring-2 focus:ring-[#67a536]/20 transition-all"
                      />
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between py-3 border-t border-b border-gray-200">
                      <span className="text-base font-bold text-[#333]">Totale da pagare alla consegna:</span>
                      <span className="text-2xl font-black text-[#e74c3c]">€365,96</span>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full lm-green-bg lm-green-bg-hover text-white font-bold text-lg py-4 rounded-md transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formLoading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Invio in corso...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          Conferma Ordine — Pagamento alla Consegna
                        </>
                      )}
                    </button>

                    <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-[#999]">
                      <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Spedizione Gratis</span>
                      <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3" /> Reso 30gg</span>
                      <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> Contrassegno</span>
                      <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Garanzia Karex</span>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Guarantee */}
            <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-5 mt-5 shadow-sm">
              <Shield className="w-10 h-10 text-[#67a536] flex-shrink-0" />
              <div>
                <p className="text-base font-bold text-[#333]">Soddisfatto o Rimborsato</p>
                <p className="text-sm text-[#666]">Reso gratuito entro 30 giorni. Se non sei soddisfatto al 100%, ti rimborsiamo tutto. Nessuna domanda.</p>
              </div>
            </div>
          </div>
        </section>

        {/* === FAQ === */}
        <section className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333] text-center mb-8">
            Domande Frequenti
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "È adatta per l'uso domestico o è troppo potente?",
                a: "È perfetta per l'uso domestico. La pistola Power Control ti permette di regolare la pressione: delicata per l'auto e i mobili da giardino, massima per vialetti e muri. Hai il controllo totale.",
              },
              {
                q: "Quanto è rumorosa?",
                a: "Grazie al motore a induzione raffreddato ad acqua, la K5 è significativamente più silenziosa delle idropulitrici con motore universale. Puoi usarla senza disturbare i vicini.",
              },
              {
                q: "Come funziona il pagamento?",
                a: "Paghi in contrassegno direttamente al corriere quando ricevi il pacco. Nessun pagamento anticipato, nessuna carta di credito necessaria. Paghi solo quando hai il prodotto in mano.",
              },
              {
                q: "Come funziona la spedizione?",
                a: "Spedizione GRATUITA in tutta Italia con corriere espresso. Ricevi il pacco direttamente a casa con tracciamento completo. Consegna in 3-5 giorni lavorativi.",
              },
              {
                q: "Posso restituirla se non mi soddisfa?",
                a: "Sì. Reso gratuito entro 30 giorni. Se non sei soddisfatto al 100%, ti rimborsiamo senza fare domande. Zero rischi.",
              },
              {
                q: "Cosa include esattamente la confezione?",
                a: "Idropulitrice K5, pistola Power Control, tubo 10m, lancia Vario Power, lancia ugello rotante, lavasuperfici T5, detergente 1L, più 3 omaggi: telo copertura, panno camoscio e kit collegamento idrico con tubo 15m e raccordi rapidi.",
              },
            ].map(({ q, a }, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#fafafa] transition-colors"
                >
                  <span className="text-sm font-bold text-[#333] pr-4">{q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#999] flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <p className="text-sm text-[#666] leading-relaxed pt-3">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* === FINAL CTA BAR === */}
        <section className="lm-green-bg py-10 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Solo 81 pezzi disponibili a questo prezzo
            </h2>
            <p className="text-white/80 text-sm mb-6">Spedizione gratuita · 3 omaggi esclusivi · Pagamento alla consegna</p>
            <button
              onClick={() => scrollTo('ordina')}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#67a536] font-bold text-base px-8 py-4 rounded-md hover:bg-gray-100 active:scale-95 transition-all shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Ordina Ora — €365,96 Paghi alla Consegna
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4 text-center">
        <p className="text-xs text-[#999] mb-1">
          © 2024 EuroBrico · Karex è un marchio registrato · Tutti i diritti riservati
        </p>
      </footer>

      {/* STICKY CTA */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] px-3 md:px-4 py-2.5 md:py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs md:text-sm font-bold text-[#333] truncate">Karex K5 Power Control Home</p>
            <div className="flex items-baseline gap-1.5 md:gap-2">
              <span className="text-base md:text-lg font-black text-[#e74c3c]">€365,96</span>
              <span className="text-[10px] md:text-xs text-[#999] line-through">€422,88</span>
              <span className="hidden sm:inline text-xs font-bold text-[#67a536]">Paghi alla Consegna</span>
            </div>
          </div>
          <button
            onClick={() => scrollTo('ordina')}
            className="lm-green-bg lm-green-bg-hover text-white font-bold px-4 md:px-6 py-2.5 md:py-3 rounded-md transition-colors flex items-center gap-2 text-xs md:text-sm flex-shrink-0 shadow-md"
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
            Ordina Ora
          </button>
        </div>
      )}
    </div>
  );
}
