import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from './cardProdus.module.css';

export default function CardProdus({ imaginePoster, titlu, pret, slug,slugParinte }){
    return(
        <Link href={`/magazin/${slugParinte}/${slug}`} className={styles.card}>
            <div className={styles.media}>
                <Image
                    src={imaginePoster}
                    alt={titlu}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
                />
            </div>

            <div className={styles.body}>
                    <h3>{titlu}</h3>
                    <p>{pret ? `${pret} RON` : "Pret la cerere"}</p>

                <span className={styles.buton}>
                    Vezi produs
                </span>
            </div>
        </Link>
    )
}
