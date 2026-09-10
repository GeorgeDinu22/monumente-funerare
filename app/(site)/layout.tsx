import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import Header from "./Header/header";
import LoadingScreen from "./LoadingScreen/loadingScreen";
import { siteUrl, numeSite, locale, descriereImplicita, imagineOpenGraph } from "./data/seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Servicii Funerare Complete Non-stop | ${numeSite}`,
    template: `%s | ${numeSite}`,
  },
  description: descriereImplicita,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale,
    siteName: numeSite,
    url: "/",
    title: `Servicii Funerare Complete Non-stop | ${numeSite}`,
    description: descriereImplicita,
    ...imagineOpenGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: `Servicii Funerare Complete Non-stop | ${numeSite}`,
    description: descriereImplicita,
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
        <div className="bodyWrapper">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
