"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, ImageOff, AlertCircle, RotateCw } from "lucide-react";
import { toast } from "sonner";
import AddAnuntModal from "../../AdminComponents/Modals/addAnuntModal";
import ConfirmModal from "../../AdminComponents/Modals/confirmModal";
import styles from "./anunturi.module.css";
import { GetAnunturi } from "../../functions/fetchData";
import { StergeAnunt } from "../../functions/StergeAnunt";
import { ToggleAnunt } from "../../functions/ToggleAnunt";

const SCHELET = [0, 1, 2, 3, 4, 5];
const MAX_ACTIVE = 3;

const formatData = (valoare) =>
  new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(valoare));

export default function AdminAnunturiPage() {
  const [anunturi, setAnunturi] = useState([]);
  const [modalDeschis, setModalDeschis] = useState(false);
  const [anuntDeSters, setAnuntDeSters] = useState(null);
  const [idInLucru, setIdInLucru] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const adaugaAnunt = (anunt) => setAnunturi((lista) => [anunt, ...lista]);

  const stergeAnunt = (id) =>
    setAnunturi((lista) => lista.filter((anunt) => anunt.id !== id));

  const actualizeazaAnunt = (anuntNou) =>
    setAnunturi((lista) =>
      lista.map((anunt) =>
        anunt.id === anuntNou.id ? { ...anunt, ...anuntNou } : anunt
      )
    );

  const activeCount = anunturi.filter((anunt) => anunt.is_active).length;

  const confirmaStergerea = async () => {
    if (!anuntDeSters) return;

    const res = await StergeAnunt(anuntDeSters.id);

    if (!res.ok) {
      toast.error(res.error);
      return;
    }

    toast.success(res.message);
    stergeAnunt(anuntDeSters.id);
    setAnuntDeSters(null);
  };

  const comutaAnunt = async (anunt) => {
    const stareNoua = !anunt.is_active;

    try {
      setIdInLucru(anunt.id);

      const res = await ToggleAnunt(anunt.id, stareNoua);

      if (!res.ok) {
        toast.error(res.error);
        return;
      }

      toast.success(res.message);
      actualizeazaAnunt({ id: anunt.id, is_active: stareNoua });
    } catch (err) {
      toast.error("A aparut o eroare neasteptata!");
    } finally {
      setIdInLucru(null);
    }
  };

  const fetchAnunturi = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await GetAnunturi();
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setAnunturi(res.data);
    } catch (err) {
      setError("A aparut o eroare neasteptata!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnunturi();
  }, []);

  return (
    <div className={styles.pagina}>
      <header className={styles.antet}>
        <div className={styles.antetText}>
          <h1 className={styles.titlu}>Anunțuri</h1>
          <p className={styles.subtitlu}>
            Bannerele afișate pe site. Poți avea maxim {MAX_ACTIVE} anunțuri active
            simultan.
          </p>
        </div>

        <button
          type="button"
          className={styles.butonPrincipal}
          onClick={() => setModalDeschis(true)}
        >
          <Plus size={18} strokeWidth={2.2} />
          <span>Adaugă anunț</span>
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
            <h2 className={styles.stareTitlu}>Anunțurile nu au putut fi încărcate</h2>
            <p className={styles.stareMesaj}>{error}</p>
          </div>

          <button type="button" className={styles.butonPrincipal} onClick={fetchAnunturi}>
            <RotateCw size={18} strokeWidth={2.2} />
            <span>Încearcă din nou</span>
          </button>
        </section>
      ) : (
        <>
          <section className={styles.contor}>
            <div className={styles.contorText}>
              <span className={styles.contorEticheta}>Total anunțuri</span>
              <span className={styles.contorValoare}>{anunturi.length}</span>
            </div>

            <div className={styles.contorText}>
              <span className={styles.contorEticheta}>Active</span>
              <span className={styles.contorValoare}>
                {activeCount}
                <span className={styles.contorLimita}> / {MAX_ACTIVE}</span>
              </span>
            </div>
          </section>

          <section className={styles.grila}>
            {anunturi.map((anunt) => (
              <article key={anunt.id} className={styles.card}>
                <div className={styles.poster}>
                  {anunt.url ? (
                    <span
                      className={styles.posterImagine}
                      style={{ backgroundImage: `url(${anunt.url})` }}
                    />
                  ) : (
                    <span className={styles.posterGol}>
                      <ImageOff size={22} strokeWidth={1.8} />
                    </span>
                  )}

                  <span
                    className={`${styles.badge} ${
                      anunt.is_active ? styles.badgeActiv : styles.badgeInactiv
                    }`}
                  >
                    {anunt.is_active ? "Activ" : "Inactiv"}
                  </span>
                </div>

                <div className={styles.cardCorp}>
                  <span className={styles.cardData}>
                    Adăugat {formatData(anunt.created_at)}
                  </span>

                  <div className={styles.cardActiuni}>
                    <span className={styles.comutatorEticheta}>
                      {anunt.is_active ? "Activ" : "Inactiv"}
                    </span>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={anunt.is_active}
                      className={`${styles.comutator} ${
                        anunt.is_active ? styles.comutatorActiv : ""
                      }`}
                      aria-label={anunt.is_active ? "Dezactivează anunțul" : "Activează anunțul"}
                      disabled={idInLucru === anunt.id}
                      onClick={() => comutaAnunt(anunt)}
                    >
                      <span className={styles.comutatorBila} />
                    </button>

                    <button
                      type="button"
                      className={`${styles.butonIcon} ${styles.butonSterge}`}
                      aria-label="Șterge anunțul"
                      disabled={idInLucru === anunt.id}
                      onClick={() => setAnuntDeSters(anunt)}
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

      <AddAnuntModal
        open={modalDeschis}
        onClose={() => setModalDeschis(false)}
        onSaved={adaugaAnunt}
        onRefresh={() => fetchAnunturi()}
      />

      <ConfirmModal
        open={Boolean(anuntDeSters)}
        onClose={() => setAnuntDeSters(null)}
        onConfirm={confirmaStergerea}
        titlu="Șterge anunțul"
        mesaj={
          <>
            Anunțul va fi șters definitiv, împreună cu imaginea lui. Acțiunea nu poate fi
            anulată.
          </>
        }
        confirmLabel="Șterge"
      />
    </div>
  );
}
