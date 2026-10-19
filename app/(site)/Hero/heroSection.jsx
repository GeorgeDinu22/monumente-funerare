import Image from "next/image";
import Link from "next/link";
import { companyInfo } from "../data/companyInfo";
import styles from './hero.module.css';

const imaginiFundal = [
    "/constrcutii-funerare/proiect5.jpeg",
    "/constrcutii-funerare/proiect2.jpeg",
    "/constrcutii-funerare/proiect3.jpeg",
    "/constrcutii-funerare/proiect6.jpeg",
];

export default function HeroSection(){
    return(
        <div className={styles.heroSection}>
            <div className={styles.fundal} aria-hidden="true">
                {imaginiFundal.map((src, index) => (
                    <Image
                        key={src}
                        className={styles.slide}
                        style={{ '--i': index }}
                        src={src}
                        alt=""
                        fill
                        sizes="92vw"
                        priority={index === 0}
                    />
                ))}
            </div>  Funerare de la 0
            <div className={styles.contentHero}>
                <h1>Construcții <span className={styles.colorText}>Funerare</span> <span className={styles.underlineText}>de la 0</span></h1>
                <p>
                    Servicii  complete și monumente funerare realizate cu grijă, respect și devotament pentru cei dragi.
                </p>
                <Link href={companyInfo.telefon.href}>
                    Sună acum
                </Link>
            </div>
        </div>
    )
}
