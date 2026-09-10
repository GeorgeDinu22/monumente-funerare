import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { linkWhatsAppCuMesaj } from "../../../data/companyInfo";
import { truncheazaDescriere, imagineOpenGraph } from "../../../data/seo";
import FooterSection from "../../../Footer/footerSection";
import GalerieProdus from "./galerieProdus";
import ActiuniProdus from "./actiuniProdus";
import styles from './produs.module.css';
import { ProdusBySlugCached } from "../../../../../cache/ProdusBySlugCached";
import { Suspense } from "react";
import SkeletonProdus from "../../../Skeletons/skeletonProdus";


function linkWhatsApp(produs,slugCategorie,slugProdus){
    const mesaj =
        `Bună ziua! Am văzut pe site „${produs.titlu}” ${produs.pret ? `,${produs.pret} RON ` : ""}` +
        `și aș vrea mai multe detalii.
        
        https://${process.env.NEXT_PUBLIC_URL}/magazin/${slugCategorie}/${slugProdus}
        `;

    return linkWhatsAppCuMesaj(mesaj);
}

export async function generateMetadata({ params }){
    const { categorie, produs: slugProdus } = await params;
    const produs = await ProdusBySlugCached(slugProdus);

    if (!produs) {
        return {
            title: "Produs negăsit",
            alternates: { canonical: `/magazin/${categorie}/${slugProdus}` },
            robots: { index: false, follow: true },
        };
    }

    const prefixPret = produs.pret ? `${produs.pret} RON – ` : "";
    const descriere = `${prefixPret}${truncheazaDescriere(produs.descriere, 155 - prefixPret.length)}`;
    const cale = `/magazin/${categorie}/${slugProdus}`;

    return {
        title: produs.titlu,
        description: descriere,
        alternates: { canonical: cale },
        openGraph: {
            title: produs.titlu,
            description: descriere,
            url: cale,
            ...(produs.poster ? { images: [produs.poster] } : imagineOpenGraph),
        },
    };
}

export async function BodyPage({params}){
   const { categorie: slugCategorie, produs: slugProdus } = await params;
    const produs = await ProdusBySlugCached(slugProdus);

    if (!produs) notFound();

    const poze = [];
    if(produs.poster){
        poze.push({url:produs.poster, alt:produs.titlu})
    }

    if(produs.images_produs){
        const images = produs.images_produs.slice().sort((a,b) => a.index - b.index);

        for (const poza of images){
            if(poza.url){
                poze.push({url:poza.url,alt:produs.titlu})
            }
        }
    };

    return(
        <>
            <main className={styles.produs}>
                <Link href={`/magazin/${slugCategorie}`} className={styles.inapoi}>
                    <ArrowLeft size={18} strokeWidth={2.2} />
                    Înapoi la magazin
                </Link>

                <div className={styles.layout}>
                    <GalerieProdus poze={poze} titlu={produs.titlu} />

                    <aside className={styles.coloanaInfo}>
                        <div className={styles.card}>
                            <h1 className={styles.titlu}>{produs.titlu}</h1>

                            <div className={styles.pret}>
                                <span className={styles.pretValoare}>{produs.pret ? `${produs.pret} RON` : "Pret la cerere"}</span>
                            </div>

                            <ActiuniProdus
                                idProdus={produs.id}
                                hrefWhatsApp={linkWhatsApp(produs,slugCategorie,slugProdus)}
                            />

                        </div>
                    </aside>

                    <div className={styles.descriere}>
                        <h2>Descriere</h2>
                        {produs.descriere.split(/\r?\n/).map((paragraf, index) => (
                            <p key={index}>{paragraf}</p>
                        ))}
                    </div>
                </div>
            </main>

            <FooterSection />
        </>
    )
}

export default async function ProdusPage({ params }){
    return(
        <Suspense fallback={<SkeletonProdus />}>
            <BodyPage params={params}/>
        </Suspense>
    )
}
