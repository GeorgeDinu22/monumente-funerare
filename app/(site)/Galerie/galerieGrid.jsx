import Image from "next/image";
import GalerieIntersectionObserver from "./galerieIntersectionObserver";
import styles from './galerie.module.css';

export default function GalerieGrid({ items }){
    return(
        <GalerieIntersectionObserver className={styles.grid}>
            {items.map((item) => (
                <li key={item.label} className={styles.item}>
                    {item.type === "video" ? (
                        <video
                            src={item.src}
                            aria-label={item.alt}
                            className={styles.image}
                            playsInline
                            muted
                            loop
                            autoPlay
                        />
                    ) : (
                        <Image
                            src={item.src}
                            alt={item.alt}
                            width={768}
                            height={1024}
                            sizes="(min-width: 1600px) 356px, (min-width: 1100px) 23vw, (min-width: 640px) 46vw, 92vw"
                            className={styles.image}
                        />
                    )}
                </li>
            ))}
        </GalerieIntersectionObserver>
    )
}
