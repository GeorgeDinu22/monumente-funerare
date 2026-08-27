"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "../../(admin)/AdminComponents/LoadingSpinner";
import styles from './login.module.css';

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LUNGIME_MINIMA_PAROLA = 6;

export default function FormularLogin(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [parola, setParola] = useState("");
    const [eroare, setEroare] = useState("");
    const [parolaVizibila, setParolaVizibila] = useState(false);
    const [seTrimite, setSeTrimite] = useState(false);

    async function trimite(e){
        e.preventDefault();

        if(seTrimite) return;

        setEroare("");

        const emailCurat = email.trim();

        if(!emailCurat || !parola){
            setEroare("Completați emailul și parola.");
            return;
        }

        if(!REGEX_EMAIL.test(emailCurat)){
            setEroare("Emailul nu are un format valid.");
            return;
        }

        if(parola.length < LUNGIME_MINIMA_PAROLA){
            setEroare(`Parola trebuie să aibă minim ${LUNGIME_MINIMA_PAROLA} caractere.`);
            return;
        }

        setSeTrimite(true);

        try{
            const raspuns = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailCurat, parola }),
            });

            const rezultat = await raspuns.json();

            if(!rezultat.ok){
                setEroare(rezultat.error);
                setSeTrimite(false);
                return;
            }

            router.push(rezultat.redirect);
            router.refresh();
        }catch{
            setEroare("Nu s-a putut face conexiunea. Încercați din nou.");
            setSeTrimite(false);
        }
    }

    return(
        <form className={styles.formular} onSubmit={trimite} noValidate>
            <div className={styles.camp}>
                <label htmlFor="email" className={styles.eticheta}>Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="nume@exemplu.ro"
                    required
                />
            </div>

            <div className={styles.camp}>
                <label htmlFor="parola" className={styles.eticheta}>Parolă</label>

                <div className={styles.campParola}>
                    <input
                        id="parola"
                        name="parola"
                        type={parolaVizibila ? "text" : "password"}
                        className={`${styles.input} ${styles.inputParola}`}
                        value={parola}
                        onChange={(e) => setParola(e.target.value)}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        required
                    />

                    <button
                        type="button"
                        className={styles.butonOchi}
                        onClick={() => setParolaVizibila((v) => !v)}
                        aria-label={parolaVizibila ? "Ascunde parola" : "Arată parola"}
                        aria-pressed={parolaVizibila}
                    >
                        {parolaVizibila ? (
                            <EyeOff size={18} strokeWidth={2} aria-hidden="true" />
                        ) : (
                            <Eye size={18} strokeWidth={2} aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {eroare && (
                <p className={styles.eroare} role="alert">{eroare}</p>
            )}

            <button type="submit" className={styles.buton} disabled={seTrimite}>
                {seTrimite ? (
                    <LoadingSpinner text="Se autentifică..." />
                ) : (
                    <>
                        <LogIn size={18} strokeWidth={2.2} />
                        Autentificare
                    </>
                )}
            </button>
        </form>
    )
}
