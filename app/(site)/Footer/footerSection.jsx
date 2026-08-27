import Link from "next/link";
import { cacheLife } from "next/cache";
import styles from './footer.module.css';

const navigare = [
    { href: "#magazin", label: "Magazin" },
    { href: "#recenzii", label: "Recenzii" },
    { href: "#galerie", label: "Galerie" },
    { href: "#contact", label: "Contact" },
];

// Anul din copyright e o valoare instabilă la prerender (Cache Components),
// așa că îl cache-uim cu un profil zilnic.
export default async function FooterSection(){
    'use cache';
    cacheLife('days');

    const an = new Date().getFullYear();

    return(
        <footer className={styles.footer}>
            <div className={styles.top}>
                <div className={styles.brand}>
                    <span className={styles.logo}>Monumente Funerare</span>
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
                    <Link href="tel:+40766360649">0733 782 872</Link>
                    <Link href="mailto:contact@monumentefunerare.ro">contact@monumentefunerare.ro</Link>
                    <span>Str. Exemplu nr. 10, București</span>
                </div>

                <div className={styles.coloana}>
                    <h3>Program</h3>
                    <span>Luni – Vineri: 08:00 – 18:00</span>
                    <span>Sâmbătă: 09:00 – 14:00</span>
                    <span>Duminică: închis</span>
                </div>
            </div>

            <div className={styles.bottom}>
                <small>© {an} Monumente Funerare. Toate drepturile rezervate.</small>
                {/* <div className={styles.legal}>
                    <Link href="/termeni">Termeni și condiții</Link>
                    <Link href="/confidentialitate">Politica de confidențialitate</Link>
                </div> */}
            </div>
        </footer>
    )
}
