import Link from "next/link";
import { cacheLife } from "next/cache";
import { companyInfo } from "../data/companyInfo";
import styles from './footer.module.css';
import Image from "next/image";

const navigare = [
    { href: "/magazin", label: "Magazin" },
    { href: "/constructii-funerare", label: "Constructii Funerare" },
    { href: "#footer", label: "Contact" },
];

export default async function FooterSection(){
    'use cache';
    cacheLife('days');

    const an = new Date().getFullYear();

    return(
        <footer id="footer" className={styles.footer}>
            <div className={styles.top}>
                <div className={styles.brand}>
                    <span className={styles.logo}>
                        <Image
                            src="/logo.webp"
                            alt="Logo Monumente Funerare"
                            width={100}
                            height={100}
                        />
                    </span>
                    <p>
                        Monumente, cruci și lucrări din marmură și granit,
                        executate cu grijă pentru memoria celor dragi.
                    </p>
                </div>

                <nav className={styles.coloana} aria-label="Navigare footer">
                    <h3>Navigare</h3>
                    {navigare.map((link) => (
                        <Link key={link.href} href={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className={styles.coloana}>
                    <h3>Contact</h3>
                    <Link href={companyInfo.telefon.href}>{companyInfo.telefon.afisat}</Link>
                    <span>{companyInfo.adresa}</span>
                    <span>CUI: {companyInfo.CUI}</span>
                </div>

                <div className={styles.coloana}>
                    <h3>Program</h3>
                    {companyInfo.program.map((rand) => (
                        <span key={rand}>{rand}</span>
                    ))}
                </div>

                <div className={styles.coloana}>
                    <h3>Legal</h3>
                    <div className={styles.legal}>
                        <Link href="/confidentialitate">Politica de confidențialitate</Link>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>© {an} Monumente Funerare. Toate drepturile rezervate.</p>
                <div className={styles.developer}>
                    Dezvoltat de{" "}
                    <Link
                        href="https://www.georgeweb-design.ro/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.devLink}
                    >
                        George Web Design
                    </Link>
                </div>
            </div>
        </footer>
    )
}
