export const siteUrl = "https://filipfunerare.ro";

export const numeSite = "Filip Funerare";

export const locale = "ro_RO";

export const descriereImplicita =
    "Construcții funerare în București și Ilfov: cavouri, cripte, monumente și cruci din granit și marmură. Oferim și servicii funerare complete non-stop.";

export const imagineOpenGraph = {
    images: [
        {
            url: "/opengraph-image.jpg",
            type: "image/jpeg",
            width: 1200,
            height: 630,
            alt: `${numeSite} — construcții funerare de la 0, monumente, cruci și cavouri din granit și marmură`,
        },
    ],
};

export function truncheazaDescriere(text, max = 155) {
    if (!text) return descriereImplicita;

    const curat = text.replace(/\s+/g, " ").trim();
    if (curat.length <= max) return curat;

    const taiat = curat.slice(0, max);
    const ultimulSpatiu = taiat.lastIndexOf(" ");

    return `${(ultimulSpatiu > 0 ? taiat.slice(0, ultimulSpatiu) : taiat).replace(/[.,;:–-]$/, "")}…`;
}
