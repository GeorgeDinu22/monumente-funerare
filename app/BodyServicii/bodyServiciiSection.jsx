import Link from "next/link";
import { ArrowUpRight, Percent } from "lucide-react";
import styles from './bodyServicii.module.css';

const servicii = [
    {
        id: "servicii-funerare",
        titlu: "Servicii funerare",
        video: "/video/backgroundVideo.mp4",
        poster: "/images/candela.jpg",
        href: "/servicii-funerare",
        puncte: [
            "Organizare completă a ceremoniei, non-stop",
            "Transport funerar și acte necesare",
            "Sicrie, cruci și accesorii pe loc",
        ],
    },
    {
        id: "constructii-funerare",
        titlu: "Construcții funerare",
        video: "/video/backgroundVideo.mp4",
        poster: "/images/atelier.jpg",
        href: "/constructii-funerare",
        puncte: [
            "Cavouri, cripte și lucrări de zidărie executate de la zero",
            "Materiale rezistente",
            "Echipă proprie de montaj",
        ],
    },
    {
        id: "magazin-cruci",
        titlu: "Magazin cruci",
        video: "/video/backgroundVideo.mp4",
        poster: "/images/cruce-marmura.jpg",
        href: "#magazin",
        puncte: [
            "Cruci din marmură și granit, gata de livrare",
            "Gravură personalizată inclusă",
            "Montaj la cimitir la cerere",
        ],
    },
];

export default function BodyServiciiSection(){
    return(
        <section id="servicii" className={styles.servicii}>
            <div className={styles.head}>
                <h2>Serviciile noastre</h2>
                <p>
                    Ne ocupăm de tot ce ține de o lucrare funerară, de la ceremonie
                    până la monumentul finalizat.
                </p>
            </div>

            <div className={styles.grid}>
                {servicii.map((serviciu) => (
                    <div key={serviciu.id} className={styles.cardWrap}>
                    <div className={styles.card}>
                        <video
                            className={styles.video}
                            src={serviciu.video}
                            poster={serviciu.poster}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-hidden="true"
                            tabIndex={-1}
                        />

                        <div className={styles.voal} aria-hidden="true" />

                        <div className={styles.continut}>
                            <h3>{serviciu.titlu}</h3>
                            <ul className={styles.lista}>
                                {serviciu.puncte.map((punct) => (
                                    <li key={punct}>{punct}</li>
                                ))}
                            </ul>

                            <Link href={serviciu.href} className={styles.buton}>
                                Vezi mai multe
                                <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                    </div>
                ))}
            </div>

            {/*
                Aceeași siluetă ca în /public/shapes/card-monument.svg, dar în unități
                objectBoundingBox (0..1), pentru cine preferă clip-path: url(#formaCard).
                Razele sunt date pe X şi pe Y separat (0.045 / 0.0329) fiindcă unitățile
                normalizate nu sunt pătrate — valorile sunt calibrate pe un card ~380x520.
            */}
            <svg className={styles.defs} aria-hidden="true" focusable="false">
                <defs>
                    <clipPath id="formaCard" clipPathUnits="objectBoundingBox">
                        <path d="M0 1V0.1958A0.045 0.0263 0 0 1 0.045 0.1695H0.225A0.045 0.0263 0 0 0 0.27 0.1432V0.0263A0.045 0.0263 0 0 1 0.315 0H0.685A0.045 0.0263 0 0 1 0.73 0.0263V0.1432A0.045 0.0263 0 0 0 0.775 0.1695H0.955A0.045 0.0263 0 0 1 1 0.1958V1Z" />
                    </clipPath>
                </defs>
            </svg>
        </section>
    )
}
