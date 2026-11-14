import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import Header from "./Header/header";
import LoadingScreen from "./LoadingScreen/loadingScreen";
import ModalApelProvider from "./ModalApel/modalApel";
import { siteUrl, numeSite, titluImplicit, descriereImplicita, imagineOpenGraph, openGraphBaza } from "./data/seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: titluImplicit,
    template: `%s | ${numeSite}`,
  },
  description: descriereImplicita,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...openGraphBaza,
    url: "/",
    title: titluImplicit,
    description: descriereImplicita,
    ...imagineOpenGraph,
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ro"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body>
        <LoadingScreen />
        <ModalApelProvider>
          <div className="bodyWrapper">
            <Header />
            {children}
          </div>
        </ModalApelProvider>
      </body>
    </html>
  );
}
