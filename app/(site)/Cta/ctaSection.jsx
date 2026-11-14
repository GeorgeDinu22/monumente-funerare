import Image from "next/image";
import CtaIntersectionObserver from "./ctaIntersectionObserver";
import { ButonApel } from "../ModalApel/modalApel";
import styles from './cta.module.css';

const titluImplicit = (
    <>Îți stăm alături cu<span className={styles.colorText}> grijă și răbdare </span></>
);

const textImplicit = `Știm că nu e o decizie ușoară. Te ascultăm, îți explicăm opțiunile
    și primești un preț clar, fără presiune și fără costuri ascunse.`;

export default function CtaSection({
    id = "contact",
    className = "",
    imagine = "/images/candela.jpg",
    alt = "Monumente Funerare",
    titlu = titluImplicit,
    text = textImplicit,
    buton = "Discută cu noi",
}){
    return(
        <section id={id} className={`${styles.cta} ${className}`}>
            <CtaIntersectionObserver className={styles.media}>
                <Image
                    src={imagine}
                    alt={alt}
                    fill
                    sizes="92vw"
                    className={styles.image}
                />
                <div className={styles.scrim} />

                <CtaIntersectionObserver className={styles.container}>
                    <div className={styles.text}>
                        <h2>{titlu}</h2>
                        <p>{text}</p>
                    </div>

                    <div className={styles.actions}>
                        <ButonApel className={styles.primar}>
                            {buton}
                        </ButonApel>
                    </div>
                </CtaIntersectionObserver>
            </CtaIntersectionObserver>
        </section>
    )
}
