import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import FacebookPixel from "./components/FacebookPixel";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "EuroBrico | Bricolage, Fai da Te e Casa",
    template: "%s | EuroBrico",
  },
  description: "Il tuo negozio online per bricolage, fai da te e articoli per la casa. Prezzi imbattibili, consegna rapida e pagamento alla consegna.",
  keywords: ["bricolage", "fai da te", "articoli casa", "ferramenta online", "giardinaggio", "arredamento"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <FacebookPixel />
        {children}
      </body>
    </html>
  );
}
