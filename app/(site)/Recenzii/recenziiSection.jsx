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
            width: 1067,
            height: 1600,
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
            width: 1600,
            height: 1067,
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
            width: 1063,
            height: 1600,
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
            width: 1600,
            height: 1067,
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
            width: 450,
            height: 600,
            alt: "Gravura de pe monumentul montat pentru Cristian Neagu",
        },
    },
    {
        nume: "Georgeta Stan",
        localitate: "Câmpina",
        stele: 5,
        text: "Am sunat seara târziu și mi-au răspuns imediat. Ne-au preluat toate formalitățile, iar noi am putut sta lângă familie.",
        poza: {
            src: "/images/monument-granit-negru.jpg",
            width: 1067,
            height: 1600,
            alt: "Monument montat pentru familia Stan",
        },
    },
    {
        nume: "Ion Radu",
        localitate: "Buzău",
        stele: 5,
        text: "Prețul comunicat la început a rămas neschimbat până la final. Fără costuri ascunse, fără surprize neplăcute.",
        poza: {
            src: "/images/cruce-marmura.jpg",
            width: 1063,
            height: 1600,
            alt: "Cruce din marmură montată pentru familia Radu",
        },
    },
    {
        nume: "Adriana Tudor",
        localitate: "Găești",
        stele: 5,
        text: "Ne-au ajutat să alegem modelul potrivit fără să insiste pe variantele scumpe. Rezultatul final a depășit așteptările.",
        poza: {
            src: "/images/placare-loc-veci.jpg",
            width: 1600,
            height: 1067,
            alt: "Loc de veci amenajat pentru familia Tudor",
        },
    },
    {
        nume: "Mihai Constantin",
        localitate: "Alexandria",
        stele: 5,
        text: "Echipa de montaj a venit la ora stabilită și a lucrat curat. Au refăcut și aleea din jur, deși nu era în înțelegere.",
        poza: {
            src: "/images/gravura.jpg",
            width: 450,
            height: 600,
            alt: "Detaliu de gravură pentru familia Constantin",
        },
    },
    {
        nume: "Rodica Ene",
        localitate: "Râmnicu Vâlcea",
        stele: 5,
        text: "Am revenit după cinci ani pentru o a doua lucrare. Aceeași seriozitate și aceeași grijă pentru detalii ca prima dată.",
        poza: {
            src: "/images/candela.jpg",
            width: 1600,
            height: 1067,
            alt: "Candelă la monumentul familiei Ene",
        },
    },
    {
        nume: "Florin Barbu",
        localitate: "Giurgiu",
        stele: 5,
        text: "Ne-au trimis poze pe parcursul lucrării, ca să vedem cum avansează. Comunicare excelentă de la început până la final.",
        poza: {
            src: "/images/monument-granit-negru.jpg",
            width: 1067,
            height: 1600,
            alt: "Monument din granit pentru familia Barbu",
        },
    },
    {
        nume: "Simona Voicu",
        localitate: "Târgu Jiu",
        stele: 5,
        text: "Discreți și atenți în tot procesul. Nu am simțit nicio secundă că suntem doar o comandă pentru ei.",
        poza: {
            src: "/images/placare-loc-veci.jpg",
            width: 1600,
            height: 1067,
            alt: "Loc de veci placat pentru familia Voicu",
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
                            width={pozaActiva.width}
                            height={pozaActiva.height}
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
