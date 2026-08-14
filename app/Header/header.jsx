'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PhoneCall } from "lucide-react";
import styles from './header.module.css';

// Adaugă aici linkurile din sidebar. Ancorele sunt prefixate cu "/" ca să
// ducă înapoi la secțiunea de pe prima pagină și din /produs/[slug].
const links = [
    { href: "/", label: "Acasă" },
    { href: "/#servicii", label: "Servicii Funerare" },
    { href: "/#constructii-funerare", label: "Construcții Funerare" },
    { href: "/#magazin", label: "Magazin Cruci" },
    { href: "/#galerie", label: "Portofoliu Proiecte" },
];

// lucide nu are iconițe de brand, așa că sigla WhatsApp e desenată aici.
function WhatsappIcon(){
    return(
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01ZM12.05 20.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.06s.89 2.39 1.01 2.55c.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.47-.29Z" />
        </svg>
    )
}

// Cât trebuie parcurs într-o direcție înainte să ascundem/arătăm headerul.
const PRAG_SCROLL = 8;

export default function Header(){
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

    // Ultima poziție citită și punctul de unde măsurăm cei 8px pe direcția curentă.
    const lastY = useRef(0);
    const anchorY = useRef(0);
    const directie = useRef(0);

    // Ascunde headerul la scroll în jos, îl aduce înapoi la scroll în sus.
    useEffect(() => {
        lastY.current = window.scrollY;
        anchorY.current = window.scrollY;

        let frame = 0;

        function evalueaza(){
            frame = 0;
            const y = Math.max(0, window.scrollY);
            const d = y > lastY.current ? 1 : y < lastY.current ? -1 : directie.current;

            // La schimbarea de direcție repornim măsurătoarea din punctul curent.
            if (d !== directie.current){
                directie.current = d;
                anchorY.current = y;
            }

            if (y <= PRAG_SCROLL){
                setHidden(false);
            } else if (d === 1 && y - anchorY.current > PRAG_SCROLL){
                setHidden(true);
            } else if (d === -1 && anchorY.current - y > PRAG_SCROLL){
                setHidden(false);
            }

            lastY.current = y;
        }

        function onScroll(){
            if (frame) return;
            frame = window.requestAnimationFrame(evalueaza);
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, []);

    // Cu sidebarul deschis pagina nu mai face scroll, deci headerul rămâne vizibil.
    useEffect(() => {
        if (open) setHidden(false);
    }, [open]);

    // Blochează scroll-ul paginii cât timp sidebarul e deschis,
    // compensând lățimea scrollbar-ului ca să nu sară layout-ul.
    useEffect(() => {
        if (!open) return;

        const { body } = document;
        const scrollbar = window.innerWidth - document.documentElement.clientWidth;
        const prevOverflow = body.style.overflow;
        const prevPadding = body.style.paddingRight;

        body.style.overflow = "hidden";
        if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

        return () => {
            body.style.overflow = prevOverflow;
            body.style.paddingRight = prevPadding;
        };
    }, [open]);

    // Închide sidebarul la Escape
    useEffect(() => {
        if (!open) return;

        function onKeyDown(e){
            if (e.key === "Escape") setOpen(false);
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    return(
        <>
            <header className={`${styles.header} ${hidden ? styles.headerHidden : ""}`}>
                <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
                    Funerare
                </Link>

                <div className={styles.actiuni}>
                    {/* Sub 420px rămâne doar iconița, de aceea ține și aria-label. */}
                    <Link
                        href="tel:+40766360649"
                        className={styles.call}
                        aria-label="Sună acum"
                    >
                        <PhoneCall size={18} strokeWidth={2.2} aria-hidden="true" />
                    </Link>

                    <button
                        type="button"
                        className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? "Închide meniul" : "Deschide meniul"}
                        aria-expanded={open}
                        aria-controls="sidebar-meniu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>

            <div
                className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
                onClick={() => setOpen(false)}
                aria-hidden="true"
            />

            <aside
                id="sidebar-meniu"
                className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}
                inert={!open}
            >
                <div className={styles.sidebarHeader}>
                    <button
                        type="button"
                        className={styles.close}
                        onClick={() => setOpen(false)}
                        aria-label="Închide meniul"
                    >
                        ✕
                    </button>
                </div>

                <nav className={styles.nav}>
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Doar iconițe, deci fiecare buton își ține eticheta în aria-label. */}
                <div className={styles.sidebarFooter}>
                    <Link
                        href="tel:+40766360649"
                        className={styles.footerCall}
                        onClick={() => setOpen(false)}
                        aria-label="Sună acum"
                    >
                        <PhoneCall size={22} strokeWidth={2.2} aria-hidden="true" />
                    </Link>

                    <Link
                        href="https://wa.me/+40 766 360 649"
                        className={styles.footerWhatsapp}
                        onClick={() => setOpen(false)}
                        aria-label="Scrie pe WhatsApp"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <WhatsappIcon />
                    </Link>
                </div>
            </aside>
        </>
    )
}
