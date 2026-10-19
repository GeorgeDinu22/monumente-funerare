import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import AdminSidebar from "./AdminSidebar/adminSidebar";
import "../globals.css";
import { siteUrl, imagineOpenGraph } from "../(site)/data/seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Admin",
  openGraph: imagineOpenGraph,
  twitter: { card: "summary_large_image", images: ["/opengraph-image.jpg"] },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <html
      lang="ro"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body>
        <div className="adminShell">
          <AdminSidebar />
          <main className="adminMain">{children}</main>
        </div>
        <Toaster position="top-left" richColors closeButton />
      </body>
    </html>
  );
}
