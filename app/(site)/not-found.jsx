import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";
import styles from './notFound.module.css';

export default function NotFound(){
    return(
        <main className={styles.pagina}>
            <div className={styles.continut}>
                <span className={styles.icon} aria-hidden="true">
                    <Compass size={36} strokeWidth={1.8} />
                </span>

                <p className={styles.cod}>404</p>

                <h1 className={styles.titlu}>
                    Pagina nu a fost găsită
                </h1>

                <p className={styles.text}>
                    Pagina pe care o căutați nu există sau a fost mutată.
                </p>

                <Link href="/" className={styles.buton}>
                    <ArrowLeft size={18} strokeWidth={2.2} />
                    Înapoi la pagina principală
                </Link>
            </div>
        </main>
    )
}
