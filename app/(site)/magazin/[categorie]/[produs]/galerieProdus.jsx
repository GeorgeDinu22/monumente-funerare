'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from './produs.module.css';

const MAX_MINIATURI = 3;
const PRAG_SWIPE = 50;

export default function GalerieProdus({ poze, titlu }){
    const [index, setIndex] = useState(0);
    const [lightbox, setLightbox] = useState(false);
    const [montat, setMontat] = useState(false);
    const startX = useRef(null);
    const inchideRef = useRef(null);
    const total = poze.length;

    const mergiLa = useCallback((pozitie) => {
        setIndex((pozitie + total) % total);
    }, [total]);

    useEffect(() => {
        setMontat(true);
    }, []);

    useEffect(() => {
        if(!lightbox) return;

        function laTasta(e){
            if(e.key === "Escape") setLightbox(false);
            if(e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
            if(e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
        }

        const overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", laTasta);
        inchideRef.current?.focus();

        return () => {
            document.body.style.overflow = overflow;
            window.removeEventListener("keydown", laTasta);
        };
    }, [lightbox, total]);

    function laStartAtingere(e){
        startX.current = e.changedTouches[0].clientX;
    }

    function laFinalAtingere(e){
        if(startX.current === null) return;

        const distanta = e.changedTouches[0].clientX - startX.current;
        startX.current = null;

        if(Math.abs(distanta) < PRAG_SWIPE) return;
        mergiLa(distanta < 0 ? index + 1 : index - 1);
    }

    const start = Math.max(0, Math.min(index - 1, total - MAX_MINIATURI));
    const miniaturi = poze.slice(start, start + MAX_MINIATURI);
    const pozaActiva = poze[index];

    return(
        <div className={styles.galerie}>
            {total > 1 && (
                <div className={styles.miniaturi}>
                    {miniaturi.map((poza, i) => {
                        const pozitie = start + i;

                        return (
                            <button
                                key={i}
                                type="button"
                                className={styles.miniatura}
                                data-activ={pozitie === index ? "" : undefined}
                                onClick={() => mergiLa(pozitie)}
                                aria-label={`Vezi poza ${pozitie + 1} din ${total}`}
                                aria-current={pozitie === index ? "true" : undefined}
                            >
                                <Image
                                    src={poza.url}
                                    alt={poza.alt}
                                    width={150}
                                    height={150}
                                    sizes="120px"
                                />
                            </button>
                        );
                    })}
                </div>
            )}

            <div className={styles.poster}>
                <div
                    className={styles.banda}
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {poze.map((poza, i) => (
                        <div
                            key={i}
                            className={styles.slide}
                            aria-hidden={i === index ? undefined : "true"}
                            inert={i === index ? undefined : true}
                        >
                            <Image
                                src={poza.url}
                                alt={poza.alt}
                                width={1000}
                                height={1000}
                                priority={i === 0}
                                sizes="(min-width: 1024px) 55vw, 80vw"
                            />
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    className={styles.lupa}
                    onClick={() => setLightbox(true)}
                    aria-label={`Mărește poza ${index + 1} din ${total}`}
                />

                {total > 1 && (
                    <>
                        <button
                            type="button"
                            className={`${styles.sageata} ${styles.sageataStanga}`}
                            onClick={() => mergiLa(index - 1)}
                            aria-label="Poza anterioară"
                        >
                            <ChevronLeft size={22} aria-hidden="true" />
                        </button>

                        <button
                            type="button"
                            className={`${styles.sageata} ${styles.sageataDreapta}`}
                            onClick={() => mergiLa(index + 1)}
                            aria-label="Poza următoare"
                        >
                            <ChevronRight size={22} aria-hidden="true" />
                        </button>

                        <div className={styles.puncte}>
                            {poze.map((poza, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className={styles.punct}
                                    data-activ={i === index ? "" : undefined}
                                    onClick={() => mergiLa(i)}
                                    aria-label={`Vezi poza ${i + 1} din ${total}`}
                                    aria-current={i === index ? "true" : undefined}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {montat && lightbox && createPortal(
                <div
                    className={styles.modal}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Galerie foto ${titlu}`}
                    onClick={() => setLightbox(false)}
                >
                    <button
                        ref={inchideRef}
                        type="button"
                        className={styles.inchide}
                        onClick={() => setLightbox(false)}
                        aria-label="Închide galeria"
                    >
                        <X size={22} aria-hidden="true" />
                    </button>

                    <div
                        className={styles.modalPoza}
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={laStartAtingere}
                        onTouchEnd={laFinalAtingere}
                    >
                        <Image
                            key={index}
                            src={pozaActiva.url}
                            alt={pozaActiva.alt}
                            width={1600}
                            height={1600}
                            sizes="100vw"
                        />
                    </div>

                    {total > 1 && (
                        <>
                            <button
                                type="button"
                                className={`${styles.sageataModal} ${styles.sageataStanga}`}
                                onClick={(e) => { e.stopPropagation(); mergiLa(index - 1); }}
                                aria-label="Poza anterioară"
                            >
                                <ChevronLeft size={24} aria-hidden="true" />
                            </button>

                            <button
                                type="button"
                                className={`${styles.sageataModal} ${styles.sageataDreapta}`}
                                onClick={(e) => { e.stopPropagation(); mergiLa(index + 1); }}
                                aria-label="Poza următoare"
                            >
                                <ChevronRight size={24} aria-hidden="true" />
                            </button>

                            <div className={styles.contor} onClick={(e) => e.stopPropagation()}>
                                {index + 1} / {total}
                            </div>
                        </>
                    )}
                </div>,
                document.body
            )}
        </div>
    )
}
