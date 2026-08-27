"use client";

import { useEffect, useState } from "react";
import { LayoutGrid, Plus, Pencil, Trash2, ImageOff, AlertCircle, RotateCw } from "lucide-react";
import AddCategoryModal from "../../AdminComponents/Modals/addCategoryModal";
import styles from "./categorii.module.css";
import { GetCategorii } from "../../functions/fetchData";

const SCHELET = [0, 1, 2, 3, 4, 5];

const formatData = (valoare) =>
  new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(valoare));

export default function AdminCategoriiPage() {
  const [categorii, setCategorii] = useState([]);
  const [modalDeschis, setModalDeschis] = useState(false);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(true);

  const adaugaCategorie = (categorie) =>
    setCategorii((lista) => [...lista, categorie]);

  const stergeCategorie = (id) =>
    setCategorii((lista) => lista.filter((categorie) => categorie.id !== id));

  const fetchCatgeorii = async () => {
    try{
      setLoading(true);
      setError("");

      const res = await GetCategorii();
      if(!res.ok){
        setError(res.error);
        return
      }
      setCategorii(res.data)
    }catch(err){
      setError("A aparut o eroare neasteptata!")
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCatgeorii();
  },[]);

  return (
    <div className={styles.pagina}>
      <header className={styles.antet}>
        <div className={styles.antetText}>
          <h1 className={styles.titlu}>Categorii</h1>
          <p className={styles.subtitlu}>Categoriile după care sunt grupate produsele.</p>
        </div>

        <button
          type="button"
          className={styles.butonPrincipal}
          onClick={() => setModalDeschis(true)}
        >
          <Plus size={18} strokeWidth={2.2} />
          <span>Adaugă categorie</span>
        </button>
      </header>

      {loading ? (
        <>
          <section className={styles.contor}>
            <span className={`${styles.contorIconita} ${styles.schelet}`} />

            <div className={styles.contorText}>
              <span className={`${styles.schelet} ${styles.scheletEticheta}`} />
              <span className={`${styles.schelet} ${styles.scheletValoare}`} />
            </div>
          </section>

          <section className={styles.grila}>
            {SCHELET.map((index) => (
              <article key={index} className={styles.card}>
                <div className={`${styles.poster} ${styles.schelet}`} />

                <div className={styles.cardCorp}>
                  <span className={`${styles.schelet} ${styles.scheletTitlu}`} />
                  <span className={`${styles.schelet} ${styles.scheletData}`} />
                </div>
              </article>
            ))}
          </section>
        </>
      ) : error ? (
        <section className={styles.stare}>
          <span className={styles.stareIconita}>
            <AlertCircle size={22} strokeWidth={1.9} />
          </span>

          <div className={styles.stareText}>
            <h2 className={styles.stareTitlu}>Categoriile nu au putut fi încărcate</h2>
            <p className={styles.stareMesaj}>{error}</p>
          </div>

          <button type="button" className={styles.butonPrincipal} onClick={fetchCatgeorii}>
            <RotateCw size={18} strokeWidth={2.2} />
            <span>Încearcă din nou</span>
          </button>
        </section>
      ) : (
        <>
          <section className={styles.contor}>

            <div className={styles.contorText}>
              <span className={styles.contorEticheta}>Total categorii</span>
              <span className={styles.contorValoare}>{categorii.length}</span>
            </div>
          </section>

          <section className={styles.grila}>
            {categorii.map((categorie) => (
              <article key={categorie.id} className={styles.card}>
                <div className={styles.poster}>
                  {categorie.poster ? (
                    <span
                      className={styles.posterImagine}
                      style={{ backgroundImage: `url(${categorie.poster})` }}
                    />
                  ) : (
                    <span className={styles.posterGol}>
                      <ImageOff size={22} strokeWidth={1.8} />
                    </span>
                  )}
                </div>

                <div className={styles.cardCorp}>
                  <h2 className={styles.cardNume}>{categorie.titlu}</h2>
                  <span className={styles.cardData}>
                    Adăugată {formatData(categorie.created_at)}
                  </span>

                  <div className={styles.cardActiuni}>
                    <button
                      type="button"
                      className={styles.butonIcon}
                      aria-label={`Editează ${categorie.titlu}`}
                    >
                      <Pencil size={16} strokeWidth={2} />
                    </button>

                    <button
                      type="button"
                      className={`${styles.butonIcon} ${styles.butonSterge}`}
                      aria-label={`Șterge ${categorie.titlu}`}
                      onClick={() => stergeCategorie(categorie.id)}
                    >
                      <Trash2 size={16} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </>
      )}

      <AddCategoryModal
        open={modalDeschis}
        onClose={() => setModalDeschis(false)}
        onSaved={adaugaCategorie}
        onRefresh={() => fetchCatgeorii()}
      />
    </div>
  );
}
