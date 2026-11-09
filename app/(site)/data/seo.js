export const siteUrl = "https://filipfunerare.ro";

export const numeSite = "Filip Funerare";

export const locale = "ro_RO";

export const titluImplicit = `Construcții funerare și cruci de marmură | ${numeSite}`;

export const descriereImplicita =
    "Construcții funerare și cruci de marmură și granit în București și Ilfov: monumente, cavouri și cripte de la 0. Servicii funerare complete non-stop.";

export const openGraphBaza = {
    type: "website",
    locale,
    siteName: numeSite,
};

export const imagineOpenGraph = {
    images: [
        {
            url: "/opengraph-image.jpg",
            type: "image/jpeg",
            width: 1200,
            height: 630,
            alt: `${numeSite} — construcții funerare și cruci de marmură și granit, monumente și cavouri`,
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
