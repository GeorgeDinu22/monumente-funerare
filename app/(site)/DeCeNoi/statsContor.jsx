'use client';

import { useEffect, useRef, useState } from "react";
import styles from './deCeNoi.module.css';

const statistici = [
    { id: "experienta", tinta: 20, sufix: "+", eticheta: "ani de experiență" },
    { id: "proiecte", tinta: 1067, sufix: "+", eticheta: "proiecte finalizate" },
    { id: "recenzii", tinta: 47, sufix: "+", eticheta: "recenzii de 5 stele" },
];

const DURATA = 1800;

function franare(t){
    return 1 - Math.pow(1 - t, 3);
}

export default function StatsContor(){
    const zona = useRef(null);
    const [pornit, setPornit] = useState(false);

    useEffect(() => {
        const element = zona.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([intrare]) => {
                if (!intrare.isIntersecting) return;

                setPornit(true);
                observer.disconnect();
            },
            { threshold: 0.35 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return(
        <div className={styles.stats} ref={zona}>
            {statistici.map((stat) => (
                <article key={stat.id} className={styles.stat}>
                    <Numar tinta={stat.tinta} pornit={pornit} />
                    <span className={styles.valoare}>
                        <span className={styles.sufix}>{stat.sufix}</span>
                        <span className={styles.eticheta}>{stat.eticheta}</span>
                    </span>
                </article>
            ))}
        </div>
    )
}

function Numar({ tinta, pornit }){
    const [valoare, setValoare] = useState(0);

    useEffect(() => {
        if (!pornit) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setValoare(tinta);
            return;
        }

        let cadru;
        const inceput = performance.now();

        function pas(acum){
            const progres = Math.min((acum - inceput) / DURATA, 1);
            setValoare(Math.round(tinta * franare(progres)));

            if (progres < 1) cadru = requestAnimationFrame(pas);
        }

        cadru = requestAnimationFrame(pas);
        return () => cancelAnimationFrame(cadru);
    }, [pornit, tinta]);

    return(
        <span className={styles.numar}>
            <span className={styles.numarFinal}>{tinta}</span>
            <span className={styles.numarLive} aria-hidden="true">{valoare}</span>
        </span>
    )
}
