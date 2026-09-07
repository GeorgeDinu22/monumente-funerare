import Image from "next/image";
import Link from "next/link";
import { Check, Hammer, Ruler, Truck, Wrench } from "lucide-react";
import AccordionGallery from "../AccordionGallery/accordionGallery";
import { companyInfo } from "../data/companyInfo";
import FooterSection from "../Footer/footerSection";
import RevealLaScroll from "../RevealLaScroll/revealLaScroll";
import ScrollExpand from "../ScrollExpand/scrollExpand";
import ScrollGallery from "../ScrollGallery/scrollGallery";
import styles from './constructiiFunerarePagina.module.css';

const titlu = "Construcții Funerare: Cavouri și Cripte";
const descriere =
    "Construim cavouri, cripte, borduri și placări din granit și marmură, cu echipă proprie de montaj. Măsurători în cimitir și ofertă fără costuri ascunse.";

export const metadata = {
    title: titlu,
    description: descriere,
    alternates: { canonical: "/constructii-funerare" },
    openGraph: {
        title: titlu,
        description: descriere,
        url: "/constructii-funerare",
    },
};

const lucrari = [
    {
        id: "1",
        titlu: "Cavou",
        imagine: "/constrcutii-funerare/proiect1.jpeg",
        detalii: [
            "Îmbrăcat intr un granit Absolute Black",
            "Monument cu Maica Domnului ",
            "Felinar și vază",
        ],
    },
    {
        id: "2",
        titlu: "Cavou",
        imagine: "/constrcutii-funerare/proiect2.jpeg",
        detalii: [
            "Îmbrăcat intr un granit SILVER",
            "Monument stil aripi ",
            "Felinar și vază",
            "Jardiniere executate manual"
        ],
    },
    {
        id: "3",
        titlu: "Bordură",
        imagine: "/constrcutii-funerare/proiect3.jpeg",
        detalii: [
            "Îmbrăcat intr un granit Absolute Black",
            "Monument cu imagine 3D",
            "Felinar și vază",
            "Piatră ornamentală decorativă marmură"
        ],
    },
    {
        id: "4",
        titlu: "Cavou dublu",
        imagine: "/constrcutii-funerare/proiect4.jpeg",
        detalii: [
            "Îmbrăcat cu marmură ",
            "Monument dublu cu cruce pe mijloc",
            "Capace masive ",
            "Felinare si vaza"
        ],
    },
    {
        id: "5",
        titlu: "Bordură dublă",
        imagine: "/constrcutii-funerare/proiect5.jpeg",
        detalii: [
            "Îmbrăcat cu marmură",
            "Monument masiv ",
            "Felinar și vaze"
        ],
    },
    {
        id: "6",
        titlu: "Cavou dublu",
        imagine: "/constrcutii-funerare/proiect6.jpeg",
        detalii: [
            "Îmbrăcat intr un granit Silver  ",
            "Monument stil Trifoi masiv  ",
            "Felinar și vaze"
        ],
    },
    {
        id: "7",
        titlu: "Cavou dublu",
        imagine: "/constrcutii-funerare/proiect7.jpeg",
        detalii: [
            "Îmbrăcat intr un granit Silver",
"            Monument cu Îngeraș ",
            "Capace masive ",
            "Felinar și vază",
"            Jardiniere lucrate manual"
        ],
    },
];

const etape = [
    {
        id: "masuratori",
        Iconita: Ruler,
        titlu: "Măsurători la fața locului",
        text: "Venim în cimitir, măsurăm locul de veci și discutăm ce se poate construi acolo.",
    },
    {
        id: "oferta",
        Iconita: Hammer,
        titlu: "Proiect și ofertă",
        text: "Propunem modelul și materialele, apoi primiți un preț final, fără costuri ascunse.",
    },
    {
        id: "executie",
        Iconita: Wrench,
        titlu: "Execuție în atelier",
        text: "Lucrarea se pregătește în atelierul propriu, cu materiale alese împreună cu familia.",
    },
    {
        id: "montaj",
        Iconita: Truck,
        titlu: "Transport și montaj",
        text: "Transportăm și montăm lucrarea cu echipa noastră, curățând locul la final.",
    },
];

const galerie = [
    {
        image: "/servicii-funerare-images/image1.jpeg",
        label: "Monument din granit negru",
        alt: "Monument funerar din granit negru cu cruce dublă și trandafiri gravați",
    },
    {
        image: "/servicii-funerare-images/image6.jpeg",
        label: "Cavou cu bordură din granit",
        alt: "Cavou finalizat cu bordură din granit gri și pietriș alb montat de echipa noastră",
    },
    {
        image: "/servicii-funerare-images/image7.jpeg",
        label: "Cavou cu cruce din granit",
        alt: "Cavou cu cruce din granit montat în cimitir, cu pietriș alb decorativ",
    },
    {
        image: "/servicii-funerare-images/image9.jpeg",
        label: "Cruce din marmură albă",
        alt: "Cruce din marmură albă montată pe soclu, cu bordură și loc pentru flori",
    },
    {
        image: "/servicii-funerare-images/image10.jpeg",
        label: "Cavou cu sculptură de înger",
        alt: "Cavou dublu din granit cu sculptură de înger și capace lustruite",
    },
    {
        image: "/servicii-funerare-images/image11.jpeg",
        label: "Monument din marmură cu cruce",
        alt: "Monument din marmură albă cu cruce sculptată și bordură din granit negru",
    },
    {
        image: "/servicii-funerare-images/image13.jpeg",
        label: "Monument din granit gri",
        alt: "Monument din granit gri cu cruce și pietriș alb decorativ",
    },
    {
        image: "/servicii-funerare-images/image16.jpeg",
        label: "Bordură din granit montată",
        alt: "Bordură din granit montată în cimitir, lucrare finalizată de echipa noastră",
    },
];

export default function ConstructiiFunerarePage(){
    return(
        <>
            <main className={styles.pagina}>
                <section className={styles.hero}>
                    <Image
                        src="/servicii-funerare-images/hero.jpeg"
                        alt=""
                        fill
                        priority
                        sizes="(min-width: 1600px) 1472px, 92vw"
                    />
                    <div className={styles.continutHero}>
                        <h1>
                            Construcții <span className={styles.colorText}>Funerare</span>
                        </h1>
                        <p>
                            Construim cavouri, cripte și monumente care rezistă în timp.
                            Lucrăm cu echipă proprie, din atelier până la montajul în
                            cimitir, cu materiale alese împreună cu familia.
                        </p>
                    </div>
                </section>

                <section className={styles.sectiune} aria-labelledby="titlu-lucrari">
                    <div className={styles.head}>
                        <h2 id="titlu-lucrari">Ce construim</h2>
                    </div>

                    <div className={styles.grid}>
                        {lucrari.map((lucrare) => (
                            <article key={lucrare.id} className={styles.card}>
                                <div className={styles.media}>
                                    <Image
                                        src={lucrare.imagine}
                                        alt={lucrare.titlu}
                                        fill
                                        sizes="(min-width: 768px) 42vw, 92vw"
                                    />
                                </div>

                                <div className={styles.corpCard}>
                                    <h3>{lucrare.titlu}</h3>

                                    <ul className={styles.lista}>
                                        {lucrare.detalii.map((detaliu) => (
                                            <li key={detaliu}>
                                                <span className={styles.bifa} aria-hidden="true">
                                                    <Check size={16} strokeWidth={3} />
                                                </span>
                                                {detaliu}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.sectiune} aria-labelledby="titlu-etape">
                    <div className={styles.head}>
                        <h2 id="titlu-etape">Cum lucrăm</h2>
                    </div>

                    <ol className={styles.etape}>
                        {etape.map((etapa, i) => (
                            <li key={etapa.id} className={styles.etapa}>
                                <span className={styles.iconita} aria-hidden="true">
                                    <etapa.Iconita size={22} strokeWidth={2} />
                                </span>
                                <span className={styles.numar} aria-hidden="true">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3>{etapa.titlu}</h3>
                                <p>{etapa.text}</p>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className={styles.sectiune} aria-labelledby="titlu-galerie">
                    <div className={styles.head}>
                        <h2 id="titlu-galerie">Lucrări realizate</h2>
                    </div>

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

                <ScrollExpand
                    src="/servicii-funerare-images/image23.jpeg"
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
                    <div className={styles.ctaExpand}>
                        <h2>Vreți o estimare pentru locul de veci?</h2>
                        <p>
                            Sunați-ne și stabilim o vizită în cimitir pentru măsurători.
                            Oferta o primiți fără nicio obligație.
                        </p>
                        <Link href={companyInfo.telefon.href} className={styles.primar}>
                            Sună acum
                        </Link>
                    </div>
                </ScrollExpand>

                <RevealLaScroll
                    selector={`.${styles.card}, .${styles.etapa}`}
                />
            </main>

            <FooterSection />
        </>
    )
}
