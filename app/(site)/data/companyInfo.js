const TELEFON_INTERNATIONAL = "++40761841576";
const TELEFON_CIFRE = TELEFON_INTERNATIONAL.replace(/\D/g, "");

export const companyInfo = {
    nume: "CONCEPT CONSTRUCT BUSINESS S.R.L",
    telefon: {
        international: TELEFON_INTERNATIONAL,
        afisat: "0761 841 576",
        href: `tel:${TELEFON_INTERNATIONAL}`,
    },
    whatsapp: {
        numar: TELEFON_CIFRE,
        href: `https://wa.me/${TELEFON_CIFRE}`,
    },
    CUI:"RO26446148",
    adresa: "Strada gării nr 9",
    program: [
        "Luni – Vineri: 08:00 – 18:00",
        "Sâmbătă: 09:00 – 14:00",
        "Duminică: închis",
    ],
};

export function linkWhatsAppCuMesaj(mesaj){
    return `${companyInfo.whatsapp.href}?text=${encodeURIComponent(mesaj)}`;
}
