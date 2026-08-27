import styles from './skeleton.module.css';

export default function SkeletonProdus(){
    return(
        <div className={styles.paginaProdus} aria-busy="true" aria-live="polite">
            <span className={styles.ascuns}>Se încarcă produsul…</span>

            <div className={`${styles.bloc} ${styles.inapoiProdus}`} />

            <div className={styles.layoutProdus}>
                <div className={styles.galerie}>
                    <div className={styles.miniaturi}>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className={`${styles.bloc} ${styles.miniatura}`} />
                        ))}
                    </div>

                    <div className={`${styles.bloc} ${styles.poster}`} />
                </div>

                <div className={styles.coloanaInfo}>
                    <div className={styles.card}>
                        <div className={`${styles.bloc} ${styles.linieTitlu}`} />
                        <div className={`${styles.bloc} ${styles.liniePret}`} />

                        <div className={styles.actiuni}>
                            <div className={`${styles.bloc} ${styles.buton}`} />
                            <div className={`${styles.bloc} ${styles.buton}`} />
                        </div>
                    </div>
                </div>

                <div className={styles.descriere}>
                    <div className={`${styles.bloc} ${styles.linieSubtitlu}`} />
                    <div className={`${styles.bloc} ${styles.linieText}`} />
                    <div className={`${styles.bloc} ${styles.linieText}`} />
                    <div className={`${styles.bloc} ${styles.linieText}`} />
                    <div className={`${styles.bloc} ${styles.linieText}`} />
                </div>
            </div>
        </div>
    )
}
