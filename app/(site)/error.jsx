'use client'

import { TriangleAlert, RotateCw } from "lucide-react";
import styles from './eroare.module.css';

export default function Eroare(){
    const handleClick = () => {
        window.location.reload();
    }
    return(
        <main className={styles.pagina}>
            <div className={styles.continut}>
                <span className={styles.icon} aria-hidden="true">
                    <TriangleAlert size={36} color="red" strokeWidth={1.8} />
                </span>

                <p className={styles.cod}>Eroare</p>

                <h1 className={styles.titlu}>
                    Nu am putut încărca pagina
                </h1>

                <p className={styles.text}>
                    Vă rugăm să reîncărcați pagina, iar dacă eroarea persistă,
                    vă rugăm să ne contactați.
                </p>

                <button type="button" onClick={() => handleClick()} className={styles.buton}>
                    <RotateCw size={18} strokeWidth={2.2} />
                    Reîncarcă pagina
                </button>
            </div>
        </main>
    )
}
