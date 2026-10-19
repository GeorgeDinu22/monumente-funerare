import { Manrope } from "next/font/google";
import "../globals.css";
import { siteUrl, imagineOpenGraph } from "../(site)/data/seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Autentificare",
  openGraph: imagineOpenGraph,
  twitter: { card: "summary_large_image", images: ["/opengraph-image.jpg"] },
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }) {
  return (
    <html
      lang="ro"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
