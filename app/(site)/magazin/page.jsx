import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ImageOff } from "lucide-react";
import FooterSection from "../Footer/footerSection";
import RevealLaScroll from "../RevealLaScroll/revealLaScroll";
import styles from './magazinPagina.module.css';
import { CategoriiCached } from "../../../cache/categoriiCahed";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SkeletonCategorii from "../Skeletons/skeletonCategorii";
import { imagineOpenGraph } from "../data/seo";

const titlu = "Magazin Monumente și Cruci Funerare";
const descriere =
    "Monumente funerare, cruci, borduri, placări și accesorii din granit și marmură, grupate pe categorii. Prețuri afișate, livrare și montaj cu echipa noastră.";

export const metadata = {
    title: titlu,
    description: descriere,
    alternates: { canonical: "/magazin" },
    openGraph: {
        title: titlu,
        description: descriere,
        url: "/magazin",
        ...imagineOpenGraph,
    },
};

async function BodyPage(){

    const categorii = await CategoriiCached();
    if(!categorii) notFound();

    return(
        <>
            <main className={styles.pagina}>
                <h1>Magazin Online</h1>

                <section className={styles.sectiune} aria-labelledby="titlu-categorii">

                    <div className={styles.grid}>
                        {categorii.map((categorie) => (
                            <Link
                                key={categorie.id}
                                href={`/magazin/${categorie.slug}`}
                                className={styles.card}
                            >
                                {categorie.poster ? (
                                    <Image
                                        src={categorie.poster}
                                        alt={categorie.titlu}
                                        width={900}
                                        height={900}
                                        sizes="(min-width: 1600px) 475px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                                    />
                                ) : (
                                    <span className={styles.posterGol} aria-hidden="true">
                                        <ImageOff size={28} strokeWidth={1.8} />
                                    </span>
                                )}

                                <span className={styles.titlu}>{categorie.titlu}</span>

                                <span className={styles.sageata} aria-hidden="true">
                                    <ArrowUpRight size={20} strokeWidth={2.2} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                <RevealLaScroll selector={`.${styles.card}`} />
            </main>

            <FooterSection />
        </>
    )
}

export default function MagazinPage(){
    return(
        <Suspense fallback={<SkeletonCategorii />}>
            <BodyPage />
        </Suspense>
    )
}
