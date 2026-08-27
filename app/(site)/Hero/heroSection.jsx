import Image from "next/image";
import Link from "next/link";
import styles from './hero.module.css';

export default function HeroSection(){
    return(
        <div className={styles.heroSection}>
            <Image
                src="/constrcutii-funerare/proiect5.jpeg"
                alt=""
                priority
                width={900}
                height={900}
            />
            <div className={styles.contentHero}>
                <h1>Servicii <span className={styles.colorText}>Funerare</span> <span className={styles.underlineText}>Complete</span></h1>
                <p>
                    Servicii funerare complete și monumente funerare realizate cu grijă, respect și devotament pentru cei dragi.
                </p>
                <Link href="tel:+40766360649">
                    Sună acum
                </Link>
            </div>
        </div>
    )
}