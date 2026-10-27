import GalerieGrid from "./galerieGrid";
import styles from './galerie.module.css';

const proiecte = [
    {
        type: "image",
        src: "/constrcutii-funerare/proiect1.jpeg",
        label: "Monument din granit negru",
        alt: "Monument din granit negru cu gravură de înger și inimă, montat pe loc de veci",
    },
    {
        type: "video",
        src: "https://monumente-funerare.b-cdn.net/static/video-gallery.mp4",
        label: "Cruci din marmură albă",
        alt: "Cruci din marmură albă sculptate, expuse în curtea atelierului",
    },
    {
        type: "image",
        src: "/constrcutii-funerare/proiect3.jpeg",
        label: "Monument modern din granit negru",
        alt: "Monument modern din granit negru lustruit, cu portret gravat și pietriș alb",
    },
    {
        type: "image",
        src: "/constrcutii-funerare/proiect4.jpeg",
        label: "Cavou placat cu marmură albă",
        alt: "Cavou placat cu marmură albă, cu cruce și două plăci gravate",
    },
    {
        type: "image",
        src: "/constrcutii-funerare/proiect5.jpeg",
        label: "Monument din marmură cu aripi",
        alt: "Monument din marmură albă sculptat cu aripi, cu bordură și pietriș",
    },
    {
        type: "image",
        src: "/constrcutii-funerare/proiect6.jpeg",
        label: "Monument din granit gri",
        alt: "Monument din granit gri cu cruce sculptată și placă gravată de familie",
    },
    {
        type: "image",
        src: "/constrcutii-funerare/proiect7.jpeg",
        label: "Loc de veci dublu placat",
        alt: "Loc de veci dublu placat cu granit, cu cruce din marmură sculptată",
    },
];

export default function GalerieSection(){
    return(
        <section id="galerie" className={styles.galerie}>
            <div className={styles.head}>
                <h2>Proiecte</h2>
            </div>

            <GalerieGrid items={proiecte} />
        </section>
    )
}
