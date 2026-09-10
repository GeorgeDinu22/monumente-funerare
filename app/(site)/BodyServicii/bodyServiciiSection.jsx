import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Percent } from "lucide-react";
import styles from './bodyServicii.module.css';

const servicii = [
    {
        id: "constructii-funerare",
        titlu: "Construcții funerare",
        imagine: "/images/ctaImage.jpeg",
        href: "/constructii-funerare",
        puncte: [
            "Cavouri, cripte și lucrări de zidărie executate de la zero",
            "Materiale rezistente",
            "Echipă proprie de montaj",
        ],
    },
    {
        id: "magazin",
        titlu: "Magazin",
        // imagine: "/images/cruce-marmura.jpg",
        video:'/images/video.mp4',
        href: "/magazin",
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
                        {serviciu.imagine ? (
                            <Image
                                className={styles.imagine}
                                src={serviciu.imagine}
                                alt=""
                                width={750}
                                height={750}
                                sizes="(min-width: 1024px) 33vw, 92vw"
                            />
                        ) : 
                            (
                                <video className={styles.video} playsInline autoPlay loop muted src={serviciu.video}/>
                            )
                        }
                        

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
