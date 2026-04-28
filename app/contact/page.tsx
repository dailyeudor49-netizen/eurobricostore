import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Contattaci per informazioni, preventivi e assistenza sui nostri prodotti.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-[#2d8a2d] to-[#339933] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Contattaci</h1>
          <p className="text-green-100 mt-1">Siamo qui per aiutarti con i tuoi progetti</p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Inviaci un Messaggio</h2>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#339933] focus:border-[#339933]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cognome</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#339933] focus:border-[#339933]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#339933] focus:border-[#339933]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Oggetto</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#339933] focus:border-[#339933]">
                    <option>Informazioni Prodotto</option>
                    <option>Assistenza Ordine</option>
                    <option>Reso e Rimborso</option>
                    <option>Collaborazione</option>
                    <option>Altro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Messaggio</label>
                  <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#339933] focus:border-[#339933]"></textarea>
                </div>
                <button type="submit" className="w-full py-2.5 bg-[#339933] text-white font-medium rounded-lg hover:bg-[#2d8a2d]">
                  Invia Messaggio
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-5">Informazioni di Contatto</h2>
                <div className="space-y-4">
                  {[
                    { t: "Email", v: "info@eurobricostore.com", d: "Risposta entro 24 ore" },
                    { t: "Indirizzo", v: "Via dell'Industria 42, 20100 Milano", d: "Italia" },
                    { t: "Orari", v: "Lunedì - Venerdì", d: "9:00 - 18:00 CET" },
                  ].map((c, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900">{c.t}</h3>
                      <p className="text-[#339933]">{c.v}</p>
                      <p className="text-gray-500 text-sm">{c.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-green-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Perché Contattarci?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Informazioni dettagliate sui prodotti</li>
                  <li>• Assistenza pre e post vendita</li>
                  <li>• Consulenza per i tuoi progetti</li>
                  <li>• Pagamento alla consegna disponibile</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
