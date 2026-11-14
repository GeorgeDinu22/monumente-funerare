"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { createContext, useCallback, useContext, useId, useMemo, useRef } from "react";
import { companyInfo } from "../data/companyInfo";
import styles from "./modalApel.module.css";

const ModalApelContext = createContext({ deschide: () => {}, inchide: () => {} });

export function useModalApel(){
    return useContext(ModalApelContext);
}

export function ButonApel({ className = "", onClick, children, ...props }){
    const { deschide } = useModalApel();

    return(
        <button
            type="button"
            className={`${styles.butonApel} ${className}`}
            onClick={(eveniment) => {
                onClick?.(eveniment);
                deschide();
            }}
            aria-haspopup="dialog"
            {...props}
        >
            {children}
        </button>
    )
}

export default function ModalApelProvider({ children }){
    const dialogRef = useRef(null);
    const titluId = useId();

    const deschide = useCallback(() => {
        const dialog = dialogRef.current;
        if(!dialog || dialog.open) return;
        delete dialog.dataset.inchidere;
        dialog.showModal();
    }, []);

    const inchide = useCallback(() => {
        const dialog = dialogRef.current;
        if(!dialog?.open) return;
        dialog.dataset.inchidere = "";
    }, []);

    const laFinalAnimatie = (eveniment) => {
        const dialog = dialogRef.current;
        if(eveniment.target !== dialog || eveniment.pseudoElement) return;
        if(!("inchidere" in dialog.dataset)) return;
        delete dialog.dataset.inchidere;
        dialog.close();
    };

    const valoare = useMemo(() => ({ deschide, inchide }), [deschide, inchide]);

    return(
        <ModalApelContext.Provider value={valoare}>
            {children}

            <dialog
                ref={dialogRef}
                className={styles.modal}
                aria-labelledby={titluId}
                onCancel={(eveniment) => {
                    eveniment.preventDefault();
                    inchide();
                }}
                onClose={() => {
                    delete dialogRef.current.dataset.inchidere;
                }}
                onClick={(eveniment) => {
                    if(eveniment.target === eveniment.currentTarget) inchide();
                }}
                onAnimationEnd={laFinalAnimatie}
            >
                <div className={styles.continut}>
                    <button
                        type="button"
                        className={styles.inchide}
                        onClick={inchide}
                        aria-label="Închide"
                    >
                        <X size={20} strokeWidth={2.2} aria-hidden="true" />
                    </button>

                    <h2 id={titluId}>Așteptăm Apelul Tău</h2>

                    <div className={styles.telefoane}>
                        {companyInfo.telefoane.map((telefon) => (
                            <Link
                                key={telefon.href}
                                href={telefon.href}
                                className={styles.telefon}
                                onClick={inchide}
                            >
                                {telefon.afisat}
                            </Link>
                        ))}
                    </div>
                </div>
            </dialog>
        </ModalApelContext.Provider>
    )
}
