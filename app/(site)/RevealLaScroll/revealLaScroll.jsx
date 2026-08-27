'use client'

import { useEffect } from "react";

export default function RevealLaScroll({ selector, prag = 0.15 }) {
    useEffect(() => {
        const elemente = document.querySelectorAll(selector);
        if (!elemente.length || !("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(
            (intrari) => {
                intrari
                    .filter((intrare) => intrare.isIntersecting)
                    .forEach((intrare, i) => {
                        intrare.target.style.transitionDelay = `${i * 90}ms`;
                        intrare.target.dataset.reveal = "vizibil";
                        observer.unobserve(intrare.target);
                    });
            },
            { threshold: prag }
        );

        for (const el of elemente) {
            if (el.getBoundingClientRect().top <= window.innerHeight) continue;
            el.dataset.reveal = "ascuns";
            observer.observe(el);
        }

        return () => observer.disconnect();
    }, [selector, prag]);

    return null;
}
