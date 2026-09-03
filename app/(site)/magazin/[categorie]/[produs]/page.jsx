import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { linkWhatsAppCuMesaj } from "../../../data/companyInfo";
import FooterSection from "../../../Footer/footerSection";
import GalerieProdus from "./galerieProdus";
import ActiuniProdus from "./actiuniProdus";
import styles from './produs.module.css';
import { ProdusBySlugCached } from "../../../../../cache/ProdusBySlugCached";
import { Suspense } from "react";
import SkeletonProdus from "../../../Skeletons/skeletonProdus";


function linkWhatsApp(produs,slugCategorie,slugProdus){
    const mesaj =
        `Bună ziua! Am văzut pe site „${produs.titlu}” (${produs.pret ? "RON" : ""}) ` +
        `și aș vrea mai multe detalii.
        
        https://${process.env.NEXT_PUBLIC_URL}/magazin/${slugCategorie}/${slugProdus}
        `;

    return linkWhatsAppCuMesaj(mesaj);
}

export async function generateMetadata({ params }){
    const { categorie, produs: slugProdus } = await params;
    const produs = await ProdusBySlugCached(slugProdus);

    if (!produs) return {};

    return {
        title: `${produs.titlu} — Monumente Funerare`,
        description: produs.descriere,
    };
}

export async function BodyPage({params}){
   const { categorie: slugCategorie, produs: slugProdus } = await params;
    const produs = await ProdusBySlugCached(slugProdus);

    await new Promise((res) => setTimeout(res,500))

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
                    {/* {categorie ? categorie.nume : "Înapoi la magazin"} */}
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
