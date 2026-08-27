import AccordionGallery from "../AccordionGallery/accordionGallery";
import ScrollGallery from "../ScrollGallery/scrollGallery";
import styles from './galerie.module.css';

const proiecte = [
    {
        image: "/images/monument-granit-negru.jpg",
        label: "Monument din granit negru",
        alt: "Monument din granit negru lustruit, vedere frontală",
    },
    {
        image: "/images/cruce-marmura.jpg",
        label: "Cruce din marmură albă",
        alt: "Cruce din marmură albă montată pe soclu",
    },
    {
        image: "/images/placare-loc-veci.jpg",
        label: "Placare loc de veci",
        alt: "Locuri de veci placate cu piatră naturală",
    },
    {
        image: "/images/bordura-granit.jpg",
        label: "Bordură din granit",
        alt: "Bordura din piatră care delimitează locul de veci",
    },
    {
        image: "/images/gravura.jpg",
        label: "Gravură cu litere aurii",
        alt: "Placă memorială cu gravură în piatră",
    },
    {
        image: "/images/atelier.jpg",
        label: "Lucrări în atelier",
        alt: "Gravarea literelor în atelier",
    },
];

export default function GalerieSection(){
    return(
        <section id="galerie" className={styles.galerie}>
            <div className={styles.head}>
                <h2>Proiecte</h2>
                <p>
                    O parte din monumentele și crucile montate de noi.
                </p>
            </div>

            <ScrollGallery
                items={proiecte}
                height={420}
                gap={12}
                radius={16}
                className={styles.galerieMobila}
            />

            <AccordionGallery
                items={proiecte}
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
    )
}
