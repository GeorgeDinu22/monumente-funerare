import Link from "next/link";
import ScrollExpand from "../ScrollExpand/scrollExpand";
import { companyInfo } from "../data/companyInfo";
import styles from './cta.module.css';

export default function CtaSection(){
    return(
        <section id="contact" className={styles.cta}>
            <ScrollExpand
                src="/images/candela.jpg"
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
                        <h2>Îți stăm alături <span className={styles.colorText}>cu răbdare și grijă</span></h2>
                        <p>
                            Știm că nu e o decizie ușoară. Te ascultăm, îți explicăm opțiunile
                            și primești un preț clar, fără presiune și fără costuri ascunse.
                        </p>
                    </div>

                    <div className={styles.actions}>
                        <Link href={companyInfo.telefon.href} className={styles.primar}>
                            Discută cu noi
                        </Link>
                    </div>
                </div>
            </ScrollExpand>
        </section>
    )
}
