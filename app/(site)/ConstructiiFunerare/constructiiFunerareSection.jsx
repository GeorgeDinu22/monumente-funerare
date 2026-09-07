import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from './constructiiFunerare.module.css';

const VIDEO = "/video/backgroundVideo.mp4";
const POSTER = "/images/atelier.jpg";

export default function ConstructiiFunerareSection(){
    return(
        <section id="constructii-funerare" className={styles.constructii}>
            <div className={styles.card}>
                <video
                    className={styles.video}
                    src={VIDEO}
                    poster={POSTER}
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
                    <h2>Construcții funerare</h2>
                    <ul className={styles.lista}>
                        <li>Cavouri, cripte și lucrări de zidărie executate de la zero</li>
                        <li>Materiale rezistente</li>
                        <li>Echipă proprie de montaj</li>
                    </ul>

                    <Link href="/constructii-funerare" className={styles.buton}>
                        Vezi mai multe
                        <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
