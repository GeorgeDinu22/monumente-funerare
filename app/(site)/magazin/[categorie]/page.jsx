import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { imagineOpenGraph, openGraphBaza } from "../../data/seo";
import CardProdus from "../../CardProdus/cardProdus";
import FooterSection from "../../Footer/footerSection";
import RevealLaScroll from "../../RevealLaScroll/revealLaScroll";
import styles from './categorie.module.css';
import { Suspense } from "react";
import { ProduseCached } from "../../../../cache/produseCached";
import { CategoriiCached } from "../../../../cache/categoriiCahed";
import SkeletonProduse from "../../Skeletons/skeletonProduse";


export async function generateMetadata({ params }){
    const { categorie: slug } = await params;
    const categorii = await CategoriiCached();
    const categorie = categorii?.find((element) => element.slug === slug);

    if (!categorie) return {};

    const titlu = `${categorie.titlu} – Modele și Prețuri`;
    const descriere = `${categorie.titlu} din granit și marmură, cu prețuri afișate. Vedeți toate modelele disponibile și sunați pentru ofertă și montaj.`;
    const cale = `/magazin/${slug}`;

    return {
        title: titlu,
        description: descriere,
        alternates: { canonical: cale },
        openGraph: {
            ...openGraphBaza,
            title: titlu,
            description: descriere,
            url: cale,
            ...imagineOpenGraph,
        },
    };
}

export async function BodyPage({params}) {
    const { categorie: slug } = await params;
    const produse = await ProduseCached(slug);
    if(produse.length < 1) notFound();

    const numeCategorie = produse[0].categorii.titlu;

    return(
        <>
            <main className={styles.pagina}>
                <div className={styles.head}>
                    <Link href="/magazin" className={styles.inapoi}>
                        <ArrowLeft size={18} strokeWidth={2.2} />
                        Toate categoriile
                    </Link>

                    <h1>{numeCategorie}</h1>
                </div>

                <div className={styles.grid}>
                    {produse.map((produs) => (
                        <CardProdus
                            key={produs.slug}
                            imaginePoster={produs.poster}
                            titlu={produs.titlu}
                            pret={produs.pret}
                            slug={produs.slug}
                            slugParinte={slug}
                        />
                    ))}
                </div>

                <RevealLaScroll selector={`.${styles.grid} > a`} />
            </main>

            <FooterSection />
        </>
    )
}

export default async function CategoriePage({ params }){
    return(
        <Suspense fallback={<SkeletonProduse />}>
            <BodyPage params={params}/>
        </Suspense>
    )
}


