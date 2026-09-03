const TELEFON_INTERNATIONAL = "++40753381189";
const TELEFON_CIFRE = TELEFON_INTERNATIONAL.replace(/\D/g, "");

export const companyInfo = {
    nume: "Monumente Funerare",
    telefon: {
        international: TELEFON_INTERNATIONAL,
        afisat: "0753 381 189",
        href: `tel:${TELEFON_INTERNATIONAL}`,
    },
    whatsapp: {
        numar: TELEFON_CIFRE,
        href: `https://wa.me/${TELEFON_CIFRE}`,
    },
    CUI:"123456",
    adresa: "Soseua Odaii nr 131",
    program: [
        "Luni – Vineri: 08:00 – 18:00",
        "Sâmbătă: 09:00 – 14:00",
        "Duminică: închis",
    ],
};

export function linkWhatsAppCuMesaj(mesaj){
    return `${companyInfo.whatsapp.href}?text=${encodeURIComponent(mesaj)}`;
}
