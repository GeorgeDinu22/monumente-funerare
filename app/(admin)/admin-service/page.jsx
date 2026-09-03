"use client";

import { useEffect, useState } from "react";
import { LayoutGrid, Package, Phone, MessageCircle, AlertCircle, RotateCw } from "lucide-react";
import GraficProduse from "../AdminComponents/GraficProduse";
import styles from "./overview.module.css";
import { GetSumar, GetTopProduse } from "../functions/GetStatistici";

const PERIOADE = [
  { zile: 1, eticheta: "Azi" },
  { zile: 7, eticheta: "7 zile" },
  { zile: 31, eticheta: "31 zile" },
];

const SCHELET = [0, 1, 2, 3];

export default function AdminServicePage() {
  const [sumar, setSumar] = useState(null);
  const [topProduse, setTopProduse] = useState([]);
  const [perioada, setPerioada] = useState(7);
  const [errorSumar, setErrorSumar] = useState("");
  const [errorGrafic, setErrorGrafic] = useState("");
  const [loadingSumar, setLoadingSumar] = useState(true);
  const [loadingGrafic, setLoadingGrafic] = useState(true);

  const fetchSumar = async () => {
    try {
      setLoadingSumar(true);
      setErrorSumar("");

      const res = await GetSumar();
      if (!res.ok) {
        setErrorSumar(res.error);
        return;
      }
      setSumar(res.data);
    } catch (err) {
      setErrorSumar("A aparut o eroare neasteptata!");
    } finally {
      setLoadingSumar(false);
    }
  };

  const fetchTopProduse = async (zile) => {
    try {
      setLoadingGrafic(true);
      setErrorGrafic("");

      const res = await GetTopProduse(zile);
      if (!res.ok) {
        setErrorGrafic(res.error);
        return;
      }
      setTopProduse(res.data.topProduse);
    } catch (err) {
      setErrorGrafic("A aparut o eroare neasteptata!");
    } finally {
      setLoadingGrafic(false);
    }
  };

  useEffect(() => {
    fetchSumar();
  }, []);

  useEffect(() => {
    fetchTopProduse(perioada);
  }, [perioada]);

  const statistici = [
    {
      cheie: "categorii",
      eticheta: "Categorii",
      valoare: sumar?.numarCategorii ?? 0,
      detaliu: "Categorii active în magazin",
      Icon: LayoutGrid,
    },
    {
      cheie: "produse",
      eticheta: "Produse",
      valoare: sumar?.numarProduse ?? 0,
      detaliu: "Produse publicate pe site",
      Icon: Package,
    },
    {
      cheie: "apeluri",
      eticheta: "Apeluri",
      valoare: sumar?.numarApeluri ?? 0,
      detaliu: "Apeluri pornite din site",
      Icon: Phone,
    },
    {
      cheie: "whatsapp",
      eticheta: "Mesaje WhatsApp",
      valoare: sumar?.numarWhatsApp ?? 0,
      detaliu: "Conversații pornite din site",
      Icon: MessageCircle,
    },
  ];

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

        {errorSumar ? (
          <div className={styles.stare}>
            <span className={styles.stareIconita}>
              <AlertCircle size={22} strokeWidth={1.9} />
            </span>

            <div className={styles.stareText}>
              <h3 className={styles.stareTitlu}>Sumarul nu a putut fi încărcat</h3>
              <p className={styles.stareMesaj}>{errorSumar}</p>
            </div>

            <button type="button" className={styles.butonPrincipal} onClick={fetchSumar}>
              <RotateCw size={18} strokeWidth={2.2} />
              <span>Încearcă din nou</span>
            </button>
          </div>
        ) : (
          <div className={styles.grila}>
            {loadingSumar
              ? SCHELET.map((index) => (
                  <article key={index} className={styles.card}>
                    <div className={styles.cardAntet}>
                      <span className={`${styles.iconita} ${styles.schelet}`} />
                      <span className={`${styles.schelet} ${styles.scheletEticheta}`} />
                    </div>

                    <span className={`${styles.schelet} ${styles.scheletValoare}`} />
                    <span className={`${styles.schelet} ${styles.scheletDetaliu}`} />
                  </article>
                ))
              : statistici.map(({ cheie, eticheta, valoare, detaliu, Icon }) => (
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
        )}
      </section>

      <section className={styles.sectiune}>
        <div className={styles.sectiuneAntet}>
          <h2 className={styles.sectiuneTitlu}>Top Produse</h2>

          <div className={styles.perioade}>
            {PERIOADE.map(({ zile, eticheta }) => (
              <button
                key={zile}
                type="button"
                className={`${styles.perioadaButon} ${
                  perioada === zile ? styles.perioadaActiva : ""
                }`}
                aria-pressed={perioada === zile}
                disabled={loadingGrafic}
                onClick={() => setPerioada(zile)}
              >
                {eticheta}
              </button>
            ))}
          </div>
        </div>

        {errorGrafic ? (
          <div className={styles.stare}>
            <span className={styles.stareIconita}>
              <AlertCircle size={22} strokeWidth={1.9} />
            </span>

            <div className={styles.stareText}>
              <h3 className={styles.stareTitlu}>Graficul nu a putut fi încărcat</h3>
              <p className={styles.stareMesaj}>{errorGrafic}</p>
            </div>

            <button
              type="button"
              className={styles.butonPrincipal}
              onClick={() => fetchTopProduse(perioada)}
            >
              <RotateCw size={18} strokeWidth={2.2} />
              <span>Încearcă din nou</span>
            </button>
          </div>
        ) : loadingGrafic ? (
          <div className={`${styles.schelet} ${styles.scheletGrafic}`} />
        ) : (
          <GraficProduse produse={topProduse} />
        )}
      </section>
    </div>
  );
}
