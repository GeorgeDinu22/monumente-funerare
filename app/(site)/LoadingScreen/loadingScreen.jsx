import styles from './loadingScreen.module.css';

export default function LoadingScreen(){
    return(
        <div className={styles.overlay} role="presentation" aria-hidden="true">
            <div className={styles.continut}>
                <div className={styles.track}>
                    <div className={styles.progres} />
                    <svg
                        className={styles.cruce}
                        viewBox="0 0 24 24"
                        width="38"
                        height="38"
                        fill="none"
                    >
                        <rect x="9" y="1" width="6" height="22" rx="1.5" fill="currentColor" />
                        <rect x="2" y="7" width="20" height="6" rx="1.5" fill="currentColor" />
                    </svg>
                </div>
                <p className={styles.text}>Aici pentru cei Dragi Ție</p>
            </div>
        </div>
    )
}
