import Image from "next/image";
import Link from "next/link";
import CtaIntersectionObserver from "./ctaIntersectionObserver";
import { companyInfo } from "../data/companyInfo";
import styles from './cta.module.css';

export default function CtaSection(){
    return(
        <section id="contact" className={styles.cta}>
            <CtaIntersectionObserver className={styles.media}>
                <Image
                    src="/images/candela.jpg"
                    alt="Monumente Funerare"
                    fill
                    sizes="92vw"
                    className={styles.image}
                />
                <div className={styles.scrim} />

                <CtaIntersectionObserver className={styles.container}>
                    <div className={styles.text}>
                        <h2>Îți stăm alături cu<span className={styles.colorText}> grijă și răbdare </span></h2>
                        <p>
                            Știm că nu e o decizie ușoară. Te ascultăm, îți explicăm opțiunile
                            și primești un preț clar, fără presiune și fără costuri ascunse.
                        </p>
                    </div>

                    <div className={styles.actions}>
                        <Link href={companyInfo.telefon.href} className={styles.primar}>
                            Discută cu noi
                        </Link>
                    </div>
                </CtaIntersectionObserver>
            </CtaIntersectionObserver>
        </section>
    )
}
