import "./globals.css";
import Link from "next/link";
import { Manrope } from "next/font/google";
import styles from "./globalNotFound.module.css";

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin", "latin-ext"],
});

export const metadata = {
    title: "Pagina nu a fost găsită",
    robots: {
        index: false,
        follow: true,
    },
};

export default function GlobalNotFound(){
    return(
        <html lang="ro" className={`${manrope.variable} antialiased`}>
            <body>
                <main className={styles.pagina}>
                    <h1 className={styles.titlu}>Se pare că te-ai rătăcit</h1>
                    <Link href="/" className={styles.buton}>
                        Înapoi acasă
                    </Link>
                </main>
            </body>
        </html>
    )
}
