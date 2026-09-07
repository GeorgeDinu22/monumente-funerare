import { siteUrl } from "./(site)/data/seo";
import { CategoriiCached } from "../cache/categoriiCahed";
import { ToateProduseleCached } from "../cache/toateProduseleCached";

export default async function sitemap(){
    const acum = new Date();

    const statice = [
        { url: `${siteUrl}`, lastModified: acum, changeFrequency: "monthly", priority: 1 },
        { url: `${siteUrl}/servicii-funerare`, lastModified: acum, changeFrequency: "monthly", priority: 0.9 },
        { url: `${siteUrl}/constructii-funerare`, lastModified: acum, changeFrequency: "monthly", priority: 0.9 },
        { url: `${siteUrl}/magazin`, lastModified: acum, changeFrequency: "weekly", priority: 0.8 },
        { url: `${siteUrl}/confidentialitate`, lastModified: acum, changeFrequency: "yearly", priority: 0.2 },
    ];

    const categorii = (await CategoriiCached()) || [];
    const produse = (await ToateProduseleCached()) || [];

    const caleCategorii = categorii.map((categorie) => ({
        url: `${siteUrl}/magazin/${categorie.slug}`,
        lastModified: acum,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    const caleProduse = produse
        .filter((produs) => produs.categorii?.slug)
        .map((produs) => ({
            url: `${siteUrl}/magazin/${produs.categorii.slug}/${produs.slug}`,
            lastModified: produs.created_at ? new Date(produs.created_at) : acum,
            changeFrequency: "monthly",
            priority: 0.6,
        }));

    return [...statice, ...caleCategorii, ...caleProduse];
}
