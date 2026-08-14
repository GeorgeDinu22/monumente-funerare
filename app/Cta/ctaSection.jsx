import Link from "next/link";
import styles from './cta.module.css';
import Image from "next/image";

export default function CtaSection(){
    return(
        <section id="contact" className={styles.cta}>
            <svg width="0" height="0" aria-hidden="true">
                <defs>
                    <clipPath id="cardClip" clipPathUnits="objectBoundingBox">
                    <path d="
                        M 0 1
                        L 0 0.35
                        C 0 0.15 0.2 0 0.5 0
                        C 0.8 0 1 0.15 1 0.35
                        L 1 1
                        Z
                    " />
                    </clipPath>
                </defs>
            </svg>
            <div className={styles.container}>
                <Image
                    src={"/images/cta2.png"}
                    alt=""
                    width={600}
                    height={600}
                />
                <div className={styles.text}>
                    <h2>Un singur telefon și <span className={styles.colorText}>ne ocupăm de tot</span></h2>
                    <p>
                        Ne spui de ce ai nevoie și primești pe loc un preț clar
                        și un termen de execuție. Răspundem non-stop.
                    </p>
                </div>

                <div className={styles.actions}>
                    <Link href="tel:+40766360649" className={styles.primar}>
                        Solicită ofertă
                    </Link>
                </div>
            </div>
        </section>
    )
}
