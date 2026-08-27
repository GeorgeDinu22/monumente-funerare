"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import styles from "./dropdown.module.css";

export default function Dropdown({
  valoare,
  optiuni = [],
  onSchimba,
  placeholder = "Alege",
  eticheta,
}) {
  const [deschis, setDeschis] = useState(false);
  const [indexActiv, setIndexActiv] = useState(0);
  const container = useRef(null);
  const lista = useRef(null);

  const selectata = optiuni.find((optiune) => optiune.valoare === valoare);

  useEffect(() => {
    if (!deschis) return;

    const laClic = (e) => {
      if (!container.current?.contains(e.target)) setDeschis(false);
    };

    document.addEventListener("mousedown", laClic);
    return () => document.removeEventListener("mousedown", laClic);
  }, [deschis]);

  useEffect(() => {
    if (!deschis) return;
    const pozitie = optiuni.findIndex((optiune) => optiune.valoare === valoare);
    setIndexActiv(pozitie === -1 ? 0 : pozitie);
  }, [deschis, optiuni, valoare]);

  useEffect(() => {
    if (!deschis) return;
    lista.current?.children[indexActiv]?.scrollIntoView({ block: "nearest" });
  }, [deschis, indexActiv]);

  const alege = (optiune) => {
    onSchimba?.(optiune.valoare);
    setDeschis(false);
  };

  const laTasta = (e) => {
    if (e.key === "Escape") {
      setDeschis(false);
      return;
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();

      if (!deschis) {
        setDeschis(true);
        return;
      }

      setIndexActiv((index) => {
        const pas = e.key === "ArrowDown" ? 1 : -1;
        return (index + pas + optiuni.length) % optiuni.length;
      });
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      if (!deschis) {
        setDeschis(true);
        return;
      }

      const optiune = optiuni[indexActiv];
      if (optiune) alege(optiune);
    }
  };

  return (
    <div ref={container} className={styles.container}>
      <button
        type="button"
        className={`${styles.declansator} ${deschis ? styles.declansatorDeschis : ""}`}
        onClick={() => setDeschis((stare) => !stare)}
        onKeyDown={laTasta}
        aria-haspopup="listbox"
        aria-expanded={deschis}
        aria-label={eticheta}
      >
        <span className={selectata ? styles.valoare : styles.placeholder}>
          {selectata ? selectata.eticheta : placeholder}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`${styles.sageata} ${deschis ? styles.sageataDeschisa : ""}`}
        />
      </button>

      {deschis && (
        <ul ref={lista} className={styles.panou} role="listbox" tabIndex={-1}>
          {optiuni.map((optiune, index) => {
            const activa = optiune.valoare === valoare;

            return (
              <li key={optiune.valoare ?? "gol"}>
                <button
                  type="button"
                  role="option"
                  aria-selected={activa}
                  className={`${styles.optiune} ${index === indexActiv ? styles.optiuneFocus : ""}`}
                  onMouseEnter={() => setIndexActiv(index)}
                  onClick={() => alege(optiune)}
                >
                  <span className={styles.optiuneText}>{optiune.eticheta}</span>
                  {activa && <Check size={15} strokeWidth={2.4} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
