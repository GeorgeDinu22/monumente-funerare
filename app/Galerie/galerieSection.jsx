'use client';

import { useState } from "react";
import Image from "next/image";
import { Drawer } from "vaul";
import { X, Images } from "lucide-react";
import styles from './galerie.module.css';

const proiecte = [
    {
        id: "monument-granit-negru",
        titlu: "Monument din granit negru",
        locatie: "Cimitirul Bellu, București",
        descriere: "Monument dublu din granit negru lustruit, cu cruce inclusă, gravură cu litere aurii și bordură asortată.",
        poze: [
            {
                src: "/images/monument-granit-negru.jpg",
                alt: "Monument din granit negru lustruit, vedere frontală",
            },
            {
                src: "/images/placare-loc-veci.jpg",
                alt: "Monumentul montat, alături de celelalte locuri de veci",
            },
            {
                src: "/images/gravura.jpg",
                alt: "Detaliu cu gravura de pe placa monumentului",
            },
        ],
    },
    {
        id: "cruce-marmura-alba",
        titlu: "Cruce din marmură albă",
        locatie: "Cimitirul Sfânta Vineri, Ploiești",
        descriere: "Cruce sculptată manual din marmură albă, finisaj mat, montată pe soclu din același material.",
        poze: [
            {
                src: "/images/cruce-marmura.jpg",
                alt: "Cruce din marmură albă montată pe soclu",
            },
            {
                src: "/images/cruce-marmura-2.jpg",
                alt: "Crucea văzută de la distanță, în cimitir",
            },
            {
                src: "/images/gravura.jpg",
                alt: "Detaliu cu finisajul marmurei",
            },
        ],
    },
    {
        id: "placare-loc-de-veci",
        titlu: "Placare loc de veci",
        locatie: "Cimitirul Eternitatea, Târgoviște",
        descriere: "Delimitare cu bordură din granit și placare completă a locului de veci cu piatră naturală.",
        poze: [
            {
                src: "/images/placare-loc-veci.jpg",
                alt: "Locuri de veci placate cu piatră naturală",
            },
            {
                src: "/images/bordura-granit.jpg",
                alt: "Bordura din piatră care delimitează locul de veci",
            },
            {
                src: "/images/monument-granit-negru.jpg",
                alt: "Monumentul și placarea, după finalizare",
            },
        ],
    },
    {
        id: "gravura-litere-aurii",
        titlu: "Gravură cu litere aurii",
        locatie: "Cimitirul Central, Pitești",
        descriere: "Inscripționare completă pe monument existent: nume, date și un simbol religios, cu litere aurite.",
        poze: [
            {
                src: "/images/gravura.jpg",
                alt: "Placă memorială cu gravură în piatră",
            },
            {
                src: "/images/gravura-2.jpg",
                alt: "Detaliu cu literele gravate manual",
            },
            {
                src: "/images/atelier.jpg",
                alt: "Gravarea literelor în atelier",
            },
        ],
    },
];

export default function GalerieSection(){
    const [proiectActiv, setProiectActiv] = useState(null);
    const [deschis, setDeschis] = useState(false);

    function deschide(proiect){
        setProiectActiv(proiect);
        setDeschis(true);
    }

    return(
        <section id="galerie" className={styles.galerie}>
            <div className={styles.head}>
                <h2>Proiecte</h2>
                <p>
                    O parte din monumentele și crucile montate de noi.
                    Apasă pe un proiect ca să vezi toate pozele lucrării.
                </p>
            </div>

            <div className={styles.grid}>
                {proiecte.map((proiect) => (
                    <button
                        key={proiect.id}
                        type="button"
                        className={styles.proiect}
                        onClick={() => deschide(proiect)}
                        aria-label={`Vezi pozele pentru ${proiect.titlu}`}
                    >
                        <span className={styles.stack}>
                            {proiect.poze.slice(0, 3).map((poza, index) => (
                                <span
                                    key={poza.src + index}
                                    className={`${styles.strat} ${styles[`strat${index}`]}`}
                                >
                                    <Image
                                        src={poza.src}
                                        alt={index === 0 ? poza.alt : ""}
                                        aria-hidden={index === 0 ? undefined : "true"}
                                        fill
                                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 88vw"
                                    />
                                </span>
                            ))}

                            <span className={styles.numar}>
                                <Images size={14} aria-hidden="true" />
                                {proiect.poze.length}
                            </span>
                        </span>

                        <span className={styles.info}>
                            <strong>{proiect.titlu}</strong>
                        </span>
                    </button>
                ))}
            </div>

            <Drawer.Root open={deschis} onOpenChange={setDeschis}>
                <Drawer.Portal>
                    <Drawer.Overlay className={styles.overlay} />
                    <Drawer.Content className={styles.drawer}>
                        <Drawer.Handle className={styles.maner} />

                        <div className={styles.drawerHead}>
                            <div className={styles.drawerText}>
                                <Drawer.Title>{proiectActiv?.titlu}</Drawer.Title>
                            </div>
                        </div>

                        <div className={styles.drawerPoze}>
                            {proiectActiv?.poze.map((poza, index) => (
                                <div
                                className={styles.pozaMare}
                                key={index}>
                                    <Image
                                        src={poza.src}
                                        alt={poza.alt}
                                        fill
                                        sizes="(min-width: 1024px) 900px, 92vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </section>
    )
}
