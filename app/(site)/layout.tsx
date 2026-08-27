import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import Header from "./Header/header";
import LoadingScreen from "./LoadingScreen/loadingScreen";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Monumente Funerare",
  description:
    "Monumente funerare realizate cu respect, atenție la detalii și materiale de calitate. Descoperă modele de cruci și monumente funerare potrivite pentru fiecare nevoie.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ro"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body>
        <LoadingScreen />
        <div className="bodyWrapper">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
