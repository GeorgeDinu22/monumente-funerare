import Link from "next/link";
import ScrollExpand from "../ScrollExpand/scrollExpand";
import { companyInfo } from "../data/companyInfo";
import styles from './cta.module.css';

export default function CtaSection(){
    return(
        <section id="contact" className={styles.cta}>
            <ScrollExpand
                src="/images/ctaImage.jpeg"
                alt="Monumente Funerare"
                title=""
                scrollHint=""
                height={650}
                startRadius={16}
                startWidth={0}
                endRadius={16}
                scrollDistance={1}
                holdDistance={0.25}
                useWindowScroll
            >
                <div className={styles.container}>
                    <div className={styles.text}>
                        <h2>Un singur telefon și <span className={styles.colorText}>ne ocupăm de tot</span></h2>
                        <p>
                            Ne spui de ce ai nevoie și primești pe loc un preț clar
                            și un termen de execuție. Răspundem non-stop.
                        </p>
                    </div>

                    <div className={styles.actions}>
                        <Link href={companyInfo.telefon.href} className={styles.primar}>
                            Solicită ofertă
                        </Link>
                    </div>
                </div>
            </ScrollExpand>
        </section>
    )
}
