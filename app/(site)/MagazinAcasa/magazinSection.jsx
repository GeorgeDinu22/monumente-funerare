import { produseMagazin } from '../data/produse';
import CardProdus from '../CardProdus/cardProdus';
import styles from './magazin.module.css';

export default function MagazinSection(){
    return(
        <section id="magazin" className={styles.magazin}>
            <div className={styles.head}>
                <h2>Magazin</h2>
            </div>

            <div className={styles.grid}>
                {produseMagazin.map((produs) => (
                    <CardProdus
                        key={produs.slug}
                        imaginePoster={produs.image}
                        titlu={produs.titlu}
                        pret={produs.pret}
                        slug={produs.slug}
                        slugParinte={produs.categorie}
                    />
                ))}
            </div>
        </section>
    )
}
