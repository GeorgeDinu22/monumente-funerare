import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ImageOff } from "lucide-react";
import FooterSection from "../Footer/footerSection";
import RevealLaScroll from "../RevealLaScroll/revealLaScroll";
import { categorii } from "../data/produse";
import styles from './magazinPagina.module.css';
import { CategoriiCached } from "../../../cache/categoriiCahed";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SkeletonCategorii from "../Skeletons/skeletonCategorii";

export const metadata = {
    title: "Magazin — Categorii de produse funerare",
    description:
        "Monumente, cruci, borduri, placări și accesorii funerare, grupate pe categorii. Alegeți categoria dorită și vedeți toate produsele disponibile.",
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
                                        fill
                                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
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
