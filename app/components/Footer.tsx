import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg mb-3">Euro<span className="text-[#339933]">Brico</span></h3>
            <p className="text-gray-400 text-sm mb-3">
              Il tuo punto di riferimento per bricolage, fai da te e articoli per la casa. Qualità e convenienza.
            </p>
            <div className="text-gray-400 text-sm space-y-1">
              <p>info@eurobricostore.com</p>
              <p>Via dell&apos;Industria 42</p>
              <p>20100 Milano, Italia</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Categorie</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/products#utensili" className="hover:text-[#339933]">Utensili</Link></li>
              <li><Link href="/products#giardino" className="hover:text-[#339933]">Giardino</Link></li>
              <li><Link href="/products#casa" className="hover:text-[#339933]">Casa</Link></li>
              <li><Link href="/products#illuminazione" className="hover:text-[#339933]">Illuminazione</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Azienda</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-[#339933]">Chi Siamo</Link></li>
              <li><Link href="/products" className="hover:text-[#339933]">Prodotti</Link></li>
              <li><Link href="/contact" className="hover:text-[#339933]">Contatti</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legale</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/privacy-policy" className="hover:text-[#339933]">Privacy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-[#339933]">Cookie</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-[#339933]">Termini</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>&copy; {year} EuroBrico S.r.l. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <span>P.IVA: IT 04829371056</span>
            <span>Registrata in Italia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
