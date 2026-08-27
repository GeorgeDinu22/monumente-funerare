import styles from './skeleton.module.css';

export default function SkeletonProduse({ carduri = 6 }){
    return(
        <div className={styles.paginaProduse} aria-busy="true" aria-live="polite">
            <span className={styles.ascuns}>Se încarcă produsele…</span>

            <div className={styles.head}>
                <div className={`${styles.bloc} ${styles.linieInapoi}`} />
                <div className={`${styles.bloc} ${styles.titluCategorie}`} />
            </div>

            <div className={styles.gridProduse}>
                {Array.from({ length: carduri }).map((_, i) => (
                    <div key={i} className={styles.cardProdus}>
                        <div className={`${styles.bloc} ${styles.mediaProdus}`} />

                        <div className={styles.bodyProdus}>
                            <div className={`${styles.bloc} ${styles.linieTitluCard}`} />
                            <div className={`${styles.bloc} ${styles.liniePretCard}`} />
                            <div className={`${styles.bloc} ${styles.butonCard}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
