import Link from "next/link";
import { ArrowLeft, PackageOpen, Phone } from "lucide-react";
import { companyInfo } from "../../data/companyInfo";
import { imagineOpenGraph } from "../../data/seo";
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

    if (!categorie) {
        return {
            title: "Categorie negăsită",
            alternates: { canonical: `/magazin/${slug}` },
            robots: { index: false, follow: true },
        };
    }

    const titlu = `${categorie.titlu} – Modele și Prețuri`;
    const descriere = `${categorie.titlu} din granit și marmură, cu prețuri afișate. Vedeți toate modelele disponibile și sunați pentru ofertă și montaj.`;
    const cale = `/magazin/${slug}`;

    return {
        title: titlu,
        description: descriere,
        alternates: { canonical: cale },
        openGraph: {
            title: titlu,
            description: descriere,
            url: cale,
            ...(categorie.poster ? { images: [categorie.poster] } : imagineOpenGraph),
        },
    };
}

function titluDinSlug(slug){
    const text = slug.replace(/-/g, " ");
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export async function BodyPage({params}) {
    const { categorie: slug } = await params;
    const produse = await ProduseCached(slug);
    if(produse.length < 1){
        return(
            <>
                <main className={styles.pagina}>
                    <div className={styles.head}>
                        <Link href="/magazin" className={styles.inapoi}>
                            <ArrowLeft size={18} strokeWidth={2.2} />
                            Toate categoriile
                        </Link>

                        <h1>{titluDinSlug(slug)}</h1>
                    </div>

                    <div className={styles.gol}>
                        <span className={styles.golIcon} aria-hidden="true">
                            <PackageOpen size={32} strokeWidth={1.8} />
                        </span>

                        <h2 className={styles.golTitlu}>
                            Nu există produse în această categorie
                        </h2>

                        <p className={styles.golText}>
                            Momentan nu avem produse listate aici. Sunați-ne și vă
                            pregătim o ofertă pentru ce aveți nevoie.
                        </p>

                        <div className={styles.golActiuni}>
                            <Link href={companyInfo.telefon.href} className={styles.golPrimar}>
                                <Phone size={18} strokeWidth={2.2} />
                                Sună acum
                            </Link>

                            <Link href="/magazin" className={styles.golSecundar}>
                                Vezi toate categoriile
                            </Link>
                        </div>
                    </div>
                </main>

                <FooterSection />
            </>
        )
    }
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


