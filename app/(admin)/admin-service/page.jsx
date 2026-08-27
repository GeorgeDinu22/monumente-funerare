import { LayoutGrid, Package, Phone, MessageCircle } from "lucide-react";
import { produse } from "../../(site)/data/produse";
import styles from "./overview.module.css";

const numarCategorii = 0;
const numarApeluri = 0;
const numarMesajeWhatsApp = 0;

const statistici = [
  {
    cheie: "categorii",
    eticheta: "Categorii",
    valoare: numarCategorii,
    detaliu: "Categorii active în magazin",
    Icon: LayoutGrid,
  },
  {
    cheie: "produse",
    eticheta: "Produse",
    valoare: produse.length,
    detaliu: "Produse publicate pe site",
    Icon: Package,
  },
  {
    cheie: "apeluri",
    eticheta: "Apeluri",
    valoare: numarApeluri,
    detaliu: "Apeluri pornite din site",
    Icon: Phone,
  },
  {
    cheie: "whatsapp",
    eticheta: "Mesaje WhatsApp",
    valoare: numarMesajeWhatsApp,
    detaliu: "Conversații pornite din site",
    Icon: MessageCircle,
  },
];

export default function AdminServicePage() {
  return (
    <div className={styles.pagina}>
      <header className={styles.antet}>
        <h1 className={styles.titlu}>Prezentare generală</h1>
        <p className={styles.subtitlu}>
          Situația magazinului și a solicitărilor primite prin site.
        </p>
      </header>

      <section className={styles.sectiune}>
        <h2 className={styles.sectiuneTitlu}>Sumar</h2>

        <div className={styles.grila}>
          {statistici.map(({ cheie, eticheta, valoare, detaliu, Icon }) => (
            <article key={cheie} className={styles.card}>
              <div className={styles.cardAntet}>
                <span className={styles.iconita}>
                  <Icon size={18} strokeWidth={2} />
                </span>
                <span className={styles.eticheta}>{eticheta}</span>
              </div>

              <span className={styles.valoare}>{valoare}</span>
              <span className={styles.detaliu}>{detaliu}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
