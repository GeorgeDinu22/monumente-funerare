'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Expand } from "lucide-react";
import styles from './recenzii.module.css';

const recenzii = [
    {
        nume: "Andrei Popescu",
        localitate: "București",
        stele: 5,
        text: "Am comandat un monument din granit negru. Execuție impecabilă, montat exact la termenul promis. Recomand cu toată încrederea.",
        poza: {
            src: "/images/monument-granit-negru.jpg",
            alt: "Monument din granit negru comandat de Andrei Popescu",
        },
    },
    {
        nume: "Maria Ionescu",
        localitate: "Ploiești",
        stele: 5,
        text: "Oameni serioși și foarte răbdători într-un moment greu pentru familia noastră. Ne-au explicat toate opțiunile fără să ne grăbească.",
        poza: {
            src: "/images/candela.jpg",
            alt: "Candelă aprinsă la monumentul familiei Ionescu",
        },
    },
    {
        nume: "Vasile Dumitru",
        localitate: "Târgoviște",
        stele: 5,
        text: "Crucea din marmură arată exact ca în proiect. Gravura este foarte fină, iar prețul a fost corect.",
        poza: {
            src: "/images/cruce-marmura.jpg",
            alt: "Cruce din marmură albă montată pentru familia Dumitru",
        },
    },
    {
        nume: "Elena Marin",
        localitate: "Pitești",
        stele: 5,
        text: "S-au ocupat de tot: transport, montaj și placarea locului de veci. Totul curat și lăsat în ordine la final.",
        poza: {
            src: "/images/placare-loc-veci.jpg",
            alt: "Loc de veci placat și delimitat cu bordură din granit",
        },
    },
    {
        nume: "Cristian Neagu",
        localitate: "Slatina",
        stele: 5,
        text: "Recomand pentru calitatea materialelor. După doi ani monumentul arată la fel de bine ca în prima zi.",
        poza: {
            src: "/images/gravura.jpg",
            alt: "Gravura de pe monumentul montat pentru Cristian Neagu",
        },
    },
];

export default function RecenziiSection(){
    const scrollerRef = useRef(null);
    const dialogRef = useRef(null);
    const [laInceput, setLaInceput] = useState(true);
    const [laSfarsit, setLaSfarsit] = useState(false);
    const [pozaActiva, setPozaActiva] = useState(null);

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

    function deschidePoza(poza){
        setPozaActiva(poza);
        dialogRef.current?.showModal();
    }

    function clickPeFundal(event){
        if (event.target === dialogRef.current) dialogRef.current.close();
    }

    return(
        <section id="recenzii" className={styles.recenzii}>
            <div className={styles.head}>
                <div className={styles.headText}>
                    <h2>Recenzii</h2>
                </div>

                <div className={styles.controls}>
                    <button
                        type="button"
                        onClick={() => scroll(-1)}
                        disabled={laInceput}
                        aria-label="Recenzia anterioară"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18 9 12l6-6" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => scroll(1)}
                        disabled={laSfarsit}
                        aria-label="Recenzia următoare"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className={styles.carusel}>
                <div
                    ref={scrollerRef}
                    className={styles.scroller}
                    role="region"
                    aria-label="Carusel cu recenzii"
                    tabIndex={0}
                >
                    {recenzii.map((recenzie) => (
                        <article key={recenzie.nume} className={styles.card}>
                            <div className={styles.stele} aria-label={`${recenzie.stele} din 5 stele`}>
                                {Array.from({ length: recenzie.stele }, (_, i) => (
                                    <svg key={i} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8-6.1-3.5-6.1 3.5 1.4-6.8L2.2 9.1l6.9-.8z" />
                                    </svg>
                                ))}
                            </div>

                            <p className={styles.text}>{recenzie.text}</p>
                            <footer className={styles.autor}>
                                <span className={styles.initiala} aria-hidden="true">
                                    {recenzie.nume.charAt(0)}
                                </span>
                                <span>
                                    <strong>{recenzie.nume}</strong>
                                    <small>{recenzie.localitate}</small>
                                </span>
                            </footer>
                        </article>
                    ))}
                </div>
            </div>

            <dialog
                ref={dialogRef}
                className={styles.modal}
                onClick={clickPeFundal}
                onClose={() => setPozaActiva(null)}
                aria-label="Poza recenziei, mărită"
            >
                {pozaActiva && (
                    <div className={styles.modalBox}>
                        <button
                            type="button"
                            className={styles.inchide}
                            onClick={() => dialogRef.current?.close()}
                            aria-label="Închide poza"
                        >
                            <X size={20} aria-hidden="true" />
                        </button>

                        <Image
                            src={pozaActiva.src}
                            alt={pozaActiva.alt}
                            fill
                            sizes="(min-width: 1024px) 900px, 92vw"
                            priority
                        />
                        <p className={styles.modalText}>{pozaActiva.alt}</p>
                    </div>
                )}
            </dialog>
        </section>
    )
}
