import Image from "next/image";
import Link from "next/link";
import { Check, PhoneCall, Leaf, Flower2, Gem, Plane } from "lucide-react";
import AccordionGallery from "../AccordionGallery/accordionGallery";
import { companyInfo } from "../data/companyInfo";
import FooterSection from "../Footer/footerSection";
import RevealLaScroll from "../RevealLaScroll/revealLaScroll";
import ScrollGallery from "../ScrollGallery/scrollGallery";
import styles from './serviciiFunerare.module.css';

export const metadata = {
    title: "Servicii Funerare Complete — Non-stop",
    description:
        "Pachete funerare complete: sicrie, transport funerar, acte de deces și organizarea ceremoniei. Disponibili non-stop, un singur telefon și ne ocupăm de tot.",
};

const pachete = [
    {
        id: "pachet-standard",
        titlu: "Pachet Standard",
        Iconita: Leaf,
        pret: "de la 2.900 lei",
        descriere: "Strictul necesar pentru o înmormântare organizată cu grijă.",
        include: [
            "Sicriu din lemn, cu garnitură completă",
            "Cruce din lemn cu inscripție",
            "Transport funerar în localitate",
            "Obținerea certificatului de deces",
            "Consiliere pentru toate formalitățile",
        ],
    },
    {
        id: "pachet-complet",
        titlu: "Pachet Complet",
        Iconita: Flower2,
        pret: "de la 4.500 lei",
        descriere: "Cel mai ales pachet — ne ocupăm noi de toată organizarea.",
        include: [
            "Tot ce cuprinde pachetul Standard",
            "Îmbălsămare și pregătirea decedatului",
            "Coroane și aranjamente florale",
            "Programarea slujbei și a gropii",
            "Capelă frigorifică până la înmormântare",
        ],
    },
    {
        id: "pachet-premium",
        titlu: "Pachet Premium",
        Iconita: Gem,
        pret: "de la 6.900 lei",
        descriere: "Organizare integrală, cu produse premium și fără nicio grijă.",
        include: [
            "Tot ce cuprinde pachetul Complet",
            "Sicriu premium, la alegere",
            "Mașină funerară dedicată și cortegiu",
            "Masă de pomenire organizată la cerere",
            "Coordonator dedicat pe toată durata",
        ],
    },
    {
        id: "repatriere",
        titlu: "Repatriere",
        Iconita: Plane,
        pret: "preț la cerere",
        descriere: "Aducem persoana dragă acasă, din orice țară din Europa.",
        include: [
            "Transport internațional autorizat",
            "Sicriu special pentru repatriere",
            "Toate actele de vamă și deces",
            "Colaborare cu autoritățile locale",
            "Preluare de la aeroport sau domiciliu",
        ],
    },
];

const galerie = [
    {
        image: "/servicii-funerare-images/image1.jpeg",
        label: "Monument din granit negru",
        alt: "Monument funerar din granit negru cu cruce dublă și trandafiri gravați",
    },
    {
        image: "/servicii-funerare-images/image2.jpeg",
        label: "Cruce din granit montată",
        alt: "Cruce din granit montată pe soclu, lucrare finalizată în cimitir",
    },
    {
        image: "/images/candela.jpg",
        label: "Loc de veci amenajat",
        alt: "Loc de veci amenajat cu bordură din piatră și pietriș decorativ",
    },
];

export default function ServiciiFunerarePage(){
    return(
        <>
            <main className={styles.pagina}>
                <section className={styles.hero}>
                    <Image
                        src="/constrcutii-funerare/proiect5.jpeg"
                        alt=""
                        width={900}
                        height={900}
                        priority
                        sizes="(min-width: 1600px) 1472px, 92vw"
                    />
                    <div className={styles.continutHero}>
                        <h1>
                            Servicii <span className={styles.colorText}>Funerare</span>
                        </h1>
                        <p>
                            Suntem alături de familie în cele mai grele momente. Ne ocupăm
                            de tot ce ține de înmormântare — acte, transport, sicriu și
                            organizarea ceremoniei — cu respect și discreție, non-stop.
                        </p>
                    </div>
                </section>

                <section className={styles.pachete} aria-label="Pachete funerare">
                    <div className={styles.header}>
                        <h2>Pachete pentru <span>cei dragi</span></h2>
                        <p>Am pregătit pachete simple și complete, pentru a vă fi mai ușor să faceți față tuturor detaliilor într-un moment dificil.</p>
                    </div>
                    <div className={styles.grid}>
                        {pachete.map((pachet) => (
                            <article key={pachet.id} className={styles.card}>
                                <header className={styles.cardHead}>
                                    <div className={styles.titluRand}>
                                        <span className={styles.iconita} aria-hidden="true">
                                            <pachet.Iconita size={22} strokeWidth={2} />
                                        </span>
                                        <h3>{pachet.titlu}</h3>
                                    </div>
                                    <span className={styles.pret}>{pachet.pret}</span>
                                </header>

                                <p className={styles.descriere}>{pachet.descriere}</p>

                                <h4 className={styles.eticheta}>Ce include</h4>
                                <ul className={styles.lista}>
                                    {pachet.include.map((punct) => (
                                        <li key={punct}>
                                            <Check size={16} strokeWidth={3} aria-hidden="true" />
                                            {punct}
                                        </li>
                                    ))}
                                </ul>

                                <div className={styles.actiuni}>
                                    <Link href={companyInfo.telefon.href} className={styles.primar}>
                                        Sună acum 
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.galerie} aria-label="Lucrări realizate">
                    <ScrollGallery
                        items={galerie}
                        height={420}
                        gap={12}
                        radius={16}
                        className={styles.galerieMobila}
                    />

                    <AccordionGallery
                        items={galerie}
                        defaultIndex={1}
                        expandRatio={0.42}
                        trigger="hover"
                        height={600}
                        mobileHeight={1000}
                        gap={12}
                        radius={16}
                        accentColor="var(--primary)"
                        overlayColor="#0b0b0c"
                        className={styles.galerieDesktop}
                    />
                </section>

                <RevealLaScroll selector={`.${styles.card}`} />
            </main>

            <FooterSection />
        </>
    )
}
