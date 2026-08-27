import { Manrope } from "next/font/google";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

export const metadata = {
  title: "Autentificare",
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
