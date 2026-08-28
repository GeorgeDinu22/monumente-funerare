"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ImageOff, AlertCircle, RotateCw } from "lucide-react";
import { toast } from "sonner";
import AddProductModal from "../../AdminComponents/Modals/addProductModal";
import EditProductModal from "../../AdminComponents/Modals/editProductModal";
import ConfirmModal from "../../AdminComponents/Modals/confirmModal";
import styles from "./produse.module.css";
import { GetCategoriiById, GetProduse } from "../../functions/fetchData";
import { StergeProdus } from "../../functions/StergeProdus";

const SCHELET = [0, 1, 2, 3, 4, 5];

const formatData = (valoare) =>
  new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(valoare));

const formatPret = (valoare) =>
  valoare === null || valoare === undefined
    ? "Preț la cerere"
    : `${new Intl.NumberFormat("ro-RO").format(valoare)} RON`;

export default function AdminProdusePage() {
  const [produse, setProduse] = useState([]);
  const [categorii, setCategorii] = useState([]);
  const [modalDeschis, setModalDeschis] = useState(false);
  const [produsDeSters, setProdusDeSters] = useState(null);
  const [produsDeEditat, setProdusDeEditat] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const adaugaProdus = (produs) => setProduse((lista) => [produs, ...lista]);

  const stergeProdus = (id) =>
    setProduse((lista) => lista.filter((produs) => produs.id !== id));

  const actualizeazaProdus = (produsNou) =>
    setProduse((lista) =>
      lista.map((produs) =>
        produs.id === produsNou.id ? { ...produs, ...produsNou } : produs
      )
    );

  const confirmaStergerea = async () => {
    if (!produsDeSters) return;

    const res = await StergeProdus(produsDeSters.id);

    if (!res.ok) {
      toast.error(res.error);
      return;
    }

    toast.success(res.message);
    stergeProdus(produsDeSters.id);
    setProdusDeSters(null);
  };

  const fetchProduse = async () => {
    try {
      setLoading(true);
      setError("");

      const [resProduse, resCategorii] = await Promise.all([
        GetProduse(),
        GetCategoriiById(),
      ]);

      if (!resProduse.ok) {
        setError(resProduse.error);
        return;
      }

      setProduse(resProduse.data);
      setCategorii(resCategorii.ok ? resCategorii.data : []);
    } catch (err) {
      setError("A aparut o eroare neasteptata!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduse();
  }, []);

  const optiuniCategorii = categorii.map((categorie) => ({
    valoare: categorie.id,
    eticheta: categorie.titlu,
  }));

  return (
    <div className={styles.pagina}>
      <header className={styles.antet}>
        <div className={styles.antetText}>
          <h1 className={styles.titlu}>Produse</h1>
          <p className={styles.subtitlu}>Produsele afișate în magazinul de pe site.</p>
        </div>

        <button
          type="button"
          className={styles.butonPrincipal}
          onClick={() => setModalDeschis(true)}
        >
          <Plus size={18} strokeWidth={2.2} />
          <span>Adaugă produs</span>
        </button>
      </header>

      {loading ? (
        <>
          <section className={styles.contor}>
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
                  <span className={`${styles.schelet} ${styles.scheletEticheta}`} />
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
            <h2 className={styles.stareTitlu}>Produsele nu au putut fi încărcate</h2>
            <p className={styles.stareMesaj}>{error}</p>
          </div>

          <button type="button" className={styles.butonPrincipal} onClick={fetchProduse}>
            <RotateCw size={18} strokeWidth={2.2} />
            <span>Încearcă din nou</span>
          </button>
        </section>
      ) : (
        <>
          <section className={styles.contor}>
            <div className={styles.contorText}>
              <span className={styles.contorEticheta}>Total produse</span>
              <span className={styles.contorValoare}>{produse.length}</span>
            </div>
          </section>

          <section className={styles.grila}>
            {produse.map((produs) => (
              <article key={produs.id} className={styles.card}>
                <div className={styles.poster}>
                  {produs.poster ? (
                    <span
                      className={styles.posterImagine}
                      style={{ backgroundImage: `url(${produs.poster})` }}
                    />
                  ) : (
                    <span className={styles.posterGol}>
                      <ImageOff size={22} strokeWidth={1.8} />
                    </span>
                  )}
                </div>

                <div className={styles.cardCorp}>
                  <div className={styles.cardAntet}>
                    <span className={styles.eticheta}>
                      {produs.categorie ?? "Fără categorie"}
                    </span>
                    <span className={styles.cardPret}>{formatPret(produs.pret)}</span>
                  </div>

                  <h2 className={styles.cardNume}>{produs.titlu}</h2>

                  {produs.descriere && (
                    <p className={styles.cardDescriere}>{produs.descriere}</p>
                  )}

                  <div className={styles.cardSubsol}>
                    <span className={styles.cardData}>
                      Adăugat {formatData(produs.created_at)}
                    </span>

                    <div className={styles.cardActiuni}>
                      <button
                        type="button"
                        className={styles.butonIcon}
                        aria-label={`Editează ${produs.titlu}`}
                        onClick={() => setProdusDeEditat(produs)}
                      >
                        <Pencil size={16} strokeWidth={2} />
                      </button>

                      <button
                        type="button"
                        className={`${styles.butonIcon} ${styles.butonSterge}`}
                        aria-label={`Șterge ${produs.titlu}`}
                        onClick={() => setProdusDeSters(produs)}
                      >
                        <Trash2 size={16} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </>
      )}

      <AddProductModal
        open={modalDeschis}
        onClose={() => setModalDeschis(false)}
        onSaved={adaugaProdus}
        onRefresh={fetchProduse}
        categoryOptions={optiuniCategorii}
      />

      <EditProductModal
        open={Boolean(produsDeEditat)}
        produs={produsDeEditat}
        onClose={() => setProdusDeEditat(null)}
        onSaved={actualizeazaProdus}
        onRefresh={fetchProduse}
        categoryOptions={optiuniCategorii}
      />

      <ConfirmModal
        open={Boolean(produsDeSters)}
        onClose={() => setProdusDeSters(null)}
        onConfirm={confirmaStergerea}
        titlu="Șterge produsul"
        mesaj={
          <>
            Produsul <strong>{produsDeSters?.titlu}</strong> va fi șters definitiv, împreună
            cu toate imaginile lui. Acțiunea nu poate fi anulată.
          </>
        }
        confirmLabel="Șterge"
      />
    </div>
  );
}
