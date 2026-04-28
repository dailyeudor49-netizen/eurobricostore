import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-white">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-[#2d8a2d] to-[#339933] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '30px 30px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-white/20 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Offerte Speciali</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-5 leading-tight">
                Il Tuo Progetto,<br /><span className="text-yellow-300">La Nostra Passione</span>
              </h1>
              <p className="text-green-100 text-lg mb-8 leading-relaxed">
                Tutto per il bricolage, il fai da te e la tua casa.
                Migliaia di prodotti a prezzi imbattibili con consegna rapida.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/products" className="px-6 py-3 bg-white text-[#339933] font-semibold rounded-lg hover:bg-green-50 transition-colors">
                  Scopri i Prodotti
                </Link>
                <Link href="/contact" className="px-6 py-3 border-2 border-white/70 hover:border-white text-white font-medium rounded-lg transition-colors">
                  Contattaci
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "5.000+", l: "Prodotti" },
                  { n: "12.000+", l: "Clienti" },
                  { n: "15", l: "Anni" },
                  { n: "24/48h", l: "Consegna" },
                ].map((s, i) => (
                  <div key={i} className="p-5 bg-white/10 backdrop-blur-sm rounded-xl text-center border border-white/20">
                    <div className="text-2xl font-bold text-yellow-300">{s.n}</div>
                    <div className="text-green-100 text-sm">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Stats */}
      <section className="md:hidden py-6 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-4 gap-2 text-center">
          {[
            { n: "5.000+", l: "Prodotti" },
            { n: "12.000+", l: "Clienti" },
            { n: "15", l: "Anni" },
            { n: "24/48h", l: "Consegna" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-lg font-bold text-[#339933]">{s.n}</div>
              <div className="text-gray-600 text-xs">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banners */}
      <section className="py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">Offerta Limitata</span>
              <h3 className="text-xl font-bold mt-1 mb-2">Fino al -55% sul Giardino</h3>
              <p className="text-sm text-orange-100">Gazebo, arredi e attrezzature</p>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">Novità</span>
              <h3 className="text-xl font-bold mt-1 mb-2">Utensili Professionali</h3>
              <p className="text-sm text-blue-100">Qualità premium, prezzi accessibili</p>
            </div>
            <div className="bg-gradient-to-r from-[#339933] to-[#2d8a2d] rounded-2xl p-6 text-white">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">Spedizione Gratuita</span>
              <h3 className="text-xl font-bold mt-1 mb-2">Ordini sopra 49€</h3>
              <p className="text-sm text-green-100">Consegna in 24/48h in tutta Europa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categorie */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Le Nostre Categorie</h2>
            <p className="text-gray-600 mt-2">Trova tutto quello che ti serve per i tuoi progetti</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { e: "🔨", n: "Utensili", h: "/products#utensili" },
              { e: "🌿", n: "Giardino", h: "/products#giardino" },
              { e: "🏠", n: "Casa", h: "/products#casa" },
              { e: "💡", n: "Illuminazione", h: "/products#illuminazione" },
              { e: "🚿", n: "Bagno", h: "/products#bagno" },
              { e: "🎨", n: "Vernici", h: "/products#vernici" },
            ].map((c, i) => (
              <Link key={i} href={c.h} className="p-5 bg-gray-50 rounded-2xl text-center hover:bg-green-50 hover:ring-2 hover:ring-[#339933]/30 transition-all group">
                <div className="text-4xl mb-3">{c.e}</div>
                <div className="text-sm font-semibold text-gray-800 group-hover:text-[#339933]">{c.n}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Prodotti in Evidenza */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Prodotti in Evidenza</h2>
              <p className="text-gray-500 mt-1">I più venduti della settimana</p>
            </div>
            <Link href="/products" className="text-[#339933] font-semibold text-sm hover:underline">
              Vedi tutti →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Gazebo Pop Up 3x3m", cat: "Giardino", price: "99,00€", old: "219,00€", badge: "-55%", href: "/gazebo-giardino", img: "/images/gazebo/1.jpg" },
              { name: "Robot Aspirapolvere", cat: "Casa", price: "129,00€", old: "249,00€", badge: "-48%", href: "/robot-asp", img: "/images/robot-asp/1.webp" },
              { name: "Air Fryer Pro", cat: "Casa", price: "89,90€", old: "179,90€", badge: "-50%", href: "/airfryer", img: "/images/airfryer/1.webp" },
              { name: "Lavapavimenti a Vapore", cat: "Casa", price: "79,90€", old: "159,90€", badge: "-50%", href: "/steammop", img: "/images/steammop/acquapulita.webp" },
              { name: "Chef One Robot Cucina", cat: "Casa", price: "99,00€", old: "219,00€", badge: "-55%", href: "/chefone", img: "/images/chef-one/aurixachefone.webp" },
              { name: "Asciugatrice Portatile", cat: "Casa", price: "69,90€", old: "139,90€", badge: "-50%", href: "/portable-dryer", img: "/images/portable-dryer/1.webp" },
              { name: "Smart Ring Fitness", cat: "Accessori", price: "49,90€", old: "99,90€", badge: "-50%", href: "/smart-ring", img: "/images/smart-ring/blackring.webp" },
              { name: "Massaggiatore Coppette", cat: "Benessere", price: "59,90€", old: "119,90€", badge: "-50%", href: "/cupping-massage", img: "/images/massaggiatore/2ddb9d4e-3ca6-448e-bff0-db8c225f3c60.webp" },
            ].map((p, i) => (
              <Link key={i} href={p.href} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group block">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">{p.badge}</div>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <span className="text-xs text-[#339933] font-semibold uppercase">{p.cat}</span>
                  <h3 className="font-semibold text-gray-900 text-sm mt-1 mb-2 group-hover:text-[#339933] transition-colors">{p.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">{p.price}</span>
                    <span className="text-sm text-gray-400 line-through">{p.old}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Perché Sceglierci */}
      <section className="py-12 md:py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Perché Scegliere EuroBrico?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🚚", t: "Consegna Rapida", d: "Spedizione in 24/48h in tutta Europa. Gratuita sopra i 49€." },
              { icon: "💶", t: "Paga alla Consegna", d: "Nessun pagamento anticipato. Paghi quando ricevi il prodotto." },
              { icon: "🔄", t: "Reso Gratuito", d: "30 giorni per restituire il prodotto senza costi aggiuntivi." },
              { icon: "✅", t: "Qualità Garantita", d: "Ogni prodotto testato e controllato prima della spedizione." },
            ].map((f, i) => (
              <div key={i} className="p-6 bg-gray-800 rounded-2xl">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.t}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ispirazione / Progetti */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Ispirati ai Nostri Progetti</h2>
            <p className="text-gray-600 mt-2">Idee e soluzioni per ogni ambiente</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Rinnova il Tuo Giardino", desc: "Gazebo, arredi da esterno e tutto per creare il tuo angolo di relax all'aperto.", color: "from-green-600 to-green-700" },
              { title: "Ristruttura con Stile", desc: "Utensili, vernici e materiali per dare nuova vita alla tua casa con il fai da te.", color: "from-amber-600 to-amber-700" },
              { title: "Casa Smart & Pulita", desc: "Robot aspirapolvere, pulizia a vapore e soluzioni intelligenti per la casa moderna.", color: "from-blue-600 to-blue-700" },
            ].map((p, i) => (
              <div key={i} className={`bg-gradient-to-br ${p.color} rounded-2xl p-8 text-white`}>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">{p.desc}</p>
                <Link href="/products" className="inline-block text-sm font-semibold underline underline-offset-4 hover:no-underline">
                  Scopri di più →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-12 md:py-16 bg-[#339933]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Non Perdere le Offerte</h2>
          <p className="text-green-100 mb-8 text-lg">Scopri le nostre promozioni esclusive e risparmia sui tuoi progetti.</p>
          <Link href="/products" className="inline-block px-8 py-3.5 bg-white text-[#339933] font-bold rounded-lg hover:bg-green-50 transition-colors text-lg">
            Vai al Catalogo
          </Link>
          <p className="text-green-200 text-sm mt-4">Oppure scrivici a info@eurobricostore.com</p>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
