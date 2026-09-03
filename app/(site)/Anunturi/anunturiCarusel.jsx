'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from './anunturi.module.css';

export default function AnunturiCarusel({ anunturi }){
    const scrollerRef = useRef(null);
    const [laInceput, setLaInceput] = useState(true);
    const [laSfarsit, setLaSfarsit] = useState(false);

    const actualizeazaSageti = useCallback(() => {
        const el = scrollerRef.current;
        if (!el) return;

        const maxScroll = el.scrollWidth - el.clientWidth;
        setLaInceput(el.scrollLeft <= 1);
        setLaSfarsit(el.scrollLeft >= maxScroll - 1);
    }, []);

    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;

        actualizeazaSageti();
        el.addEventListener("scroll", actualizeazaSageti, { passive: true });
        window.addEventListener("resize", actualizeazaSageti);

        return () => {
            el.removeEventListener("scroll", actualizeazaSageti);
            window.removeEventListener("resize", actualizeazaSageti);
        };
    }, [actualizeazaSageti]);

    function scroll(directie){
        const el = scrollerRef.current;
        if (!el) return;

        const carduri = el.children;
        const pas = carduri.length > 1
            ? carduri[1].offsetLeft - carduri[0].offsetLeft
            : el.clientWidth * 0.8;
        el.scrollBy({ left: pas * directie, behavior: "smooth" });
    }

    const areControale = anunturi.length > 1;

    return(
        <section id="anunturi" className={styles.anunturi} aria-labelledby="titlu-anunturi">
            <div className={styles.head}>
                <div className={styles.headText}>
                    <h2 id="titlu-anunturi">Anunțuri</h2>
                </div>

                {areControale && (
                    <div className={styles.controls}>
                        <button
                            type="button"
                            onClick={() => scroll(-1)}
                            disabled={laInceput}
                            aria-label="Anunțul anterior"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18 9 12l6-6" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => scroll(1)}
                            disabled={laSfarsit}
                            aria-label="Anunțul următor"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.carusel}>
                <div
                    ref={scrollerRef}
                    className={styles.scroller}
                    role="region"
                    aria-label="Carusel cu anunțuri"
                    tabIndex={0}
                >
                    {anunturi.map((anunt) => (
                        <article key={anunt.id} className={styles.card}>
                            <Image
                                src={anunt.url}
                                alt="Anunț"
                                fill
                                sizes="(min-width: 1024px) 900px, 92vw"
                            />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
