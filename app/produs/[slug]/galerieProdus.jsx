'use client';

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from './produs.module.css';

// Câte miniaturi arătăm pe verticală, în stânga pozei mari.
const MAX_MINIATURI = 3;

// Galerie: slider vertical cu miniaturi în stânga, poza mare în dreapta.
export default function GalerieProdus({ poze, titlu }){
    const [index, setIndex] = useState(0);
    const total = poze.length;

    function mergiLa(pozitie){
        // rămânem în interval, cu wrap la capete
        setIndex((pozitie + total) % total);
    }

    // Dacă produsul are mai mult de 3 poze, fereastra de miniaturi
    // gliseaza ca poza activă să rămână vizibilă.
    const start = Math.max(0, Math.min(index - 1, total - MAX_MINIATURI));
    const miniaturi = poze.slice(start, start + MAX_MINIATURI);

    return(
        <div className={styles.galerie}>
            <div className={styles.miniaturi}>
                {miniaturi.map((poza, i) => {
                    const pozitie = start + i;

                    return (
                        <button
                            key={poza.src + pozitie}
                            type="button"
                            className={styles.miniatura}
                            data-activ={pozitie === index ? "" : undefined}
                            onClick={() => mergiLa(pozitie)}
                            aria-label={`Vezi poza ${pozitie + 1} din ${total}`}
                            aria-current={pozitie === index ? "true" : undefined}
                        >
                            <Image
                                src={poza.src}
                                alt=""
                                fill
                                sizes="120px"
                            />
                        </button>
                    );
                })}
            </div>

            <div className={styles.poster}>
                <div
                    className={styles.banda}
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {poze.map((poza, i) => (
                        <div
                            key={poza.src + i}
                            className={styles.slide}
                            aria-hidden={i === index ? undefined : "true"}
                            inert={i === index ? undefined : true}
                        >
                            <Image
                                src={poza.src}
                                alt={poza.alt || titlu}
                                fill
                                priority={i === 0}
                                sizes="(min-width: 1024px) 55vw, 80vw"
                            />
                        </div>
                    ))}
                </div>

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
                                    key={poza.src + i}
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
        </div>
    )
}
