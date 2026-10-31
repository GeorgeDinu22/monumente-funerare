export const siteUrl = "https://filipfunerare.ro";

export const numeSite = "Filip Funerare";

export const locale = "ro_RO";

export const descriereImplicita =
    "Servicii funerare complete, disponibile non-stop, și monumente funerare din granit și marmură. Sicrie, transport, acte de deces, cavouri și cruci.";

export const imagineOpenGraph = {
    images: [
        {
            url: "/opengraph-image.jpg",
            type: "image/jpeg",
            width: 1200,
            height: 630,
            alt: `${numeSite} — servicii funerare complete non-stop și monumente funerare din granit și marmură`,
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
