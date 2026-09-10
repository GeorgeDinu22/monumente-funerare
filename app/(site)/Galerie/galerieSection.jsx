import AccordionGallery from "../AccordionGallery/accordionGallery";
import ScrollGallery from "../ScrollGallery/scrollGallery";
import styles from './galerie.module.css';

const proiecte = [
    {
        image: "/constrcutii-funerare/proiect1.jpeg",
        label: "Monument din granit negru",
        alt: "Monument din granit negru cu gravură de înger și inimă, montat pe loc de veci",
    },
    {
        image: "/constrcutii-funerare/proiect2.jpeg",
        label: "Monument dublu din granit",
        alt: "Monument dublu din granit gri, cu cruce centrală și medalioane foto",
    },
    {
        image: "/constrcutii-funerare/proiect3.jpeg",
        label: "Monument modern din granit negru",
        alt: "Monument modern din granit negru lustruit, cu portret gravat și pietriș alb",
    },
    {
        image: "/constrcutii-funerare/proiect4.jpeg",
        label: "Cavou placat cu marmură albă",
        alt: "Cavou placat cu marmură albă, cu cruce și două plăci gravate",
    },
    {
        image: "/constrcutii-funerare/proiect5.jpeg",
        label: "Monument din marmură cu aripi",
        alt: "Monument din marmură albă sculptat cu aripi, cu bordură și pietriș",
    },
    {
        image: "/constrcutii-funerare/proiect6.jpeg",
        label: "Monument din granit gri",
        alt: "Monument din granit gri cu cruce sculptată și placă gravată de familie",
    },
    {
        image: "/constrcutii-funerare/proiect7.jpeg",
        label: "Loc de veci dublu placat",
        alt: "Loc de veci dublu placat cu granit, cu cruce din marmură sculptată",
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
