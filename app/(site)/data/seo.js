export const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const numeSite = "Filip Funerare";

export const locale = "ro_RO";

export const descriereImplicita =
    "Servicii funerare complete, disponibile non-stop, și monumente funerare din granit și marmură. Sicrie, transport, acte de deces, cavouri și cruci.";

export function truncheazaDescriere(text, max = 155) {
    if (!text) return descriereImplicita;

    const curat = text.replace(/\s+/g, " ").trim();
    if (curat.length <= max) return curat;

    const taiat = curat.slice(0, max);
    const ultimulSpatiu = taiat.lastIndexOf(" ");

    return `${(ultimulSpatiu > 0 ? taiat.slice(0, ultimulSpatiu) : taiat).replace(/[.,;:–-]$/, "")}…`;
}
