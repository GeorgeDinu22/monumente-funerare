import StatsContor from './statsContor';
import styles from './deCeNoi.module.css';

export default function DeCeNoiSection(){
    return(
        <section id="de-ce-noi" className={styles.deCeNoi}>
            <div className={styles.head}>
                <h2>De ce să ne alegi</h2>
                <p>
                    Lucrăm cu piatră naturală și cu oameni care știu ce fac,
                    de la prima schiță până la montajul în cimitir.
                </p>
            </div>

            <StatsContor />
        </section>
    )
}
