import styles from './skeleton.module.css';

export default function SkeletonCategorii({ carduri = 6 }){
    return(
        <div className={styles.pagina} aria-busy="true" aria-live="polite">
            <span className={styles.ascuns}>Se încarcă categoriile…</span>

            <div className={`${styles.bloc} ${styles.titluPagina}`} />

            <div className={styles.gridCategorii}>
                {Array.from({ length: carduri }).map((_, i) => (
                    <div key={i} className={`${styles.bloc} ${styles.cardCategorie}`} />
                ))}
            </div>
        </div>
    )
}
