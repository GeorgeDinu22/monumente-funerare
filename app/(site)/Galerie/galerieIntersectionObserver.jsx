'use client'

import { useEffect, useRef } from "react";

export default function GalerieIntersectionObserver({ className, children }) {
    const listRef = useRef(null);

    useEffect(() => {
        const list = listRef.current;
        if (!list) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    entry.target.dataset.visible = "";
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
        );

        for (const item of list.children) observer.observe(item);
        list.dataset.observing = "";

        return () => observer.disconnect();
    }, []);

    return (
        <ul ref={listRef} className={className}>
            {children}
        </ul>
    );
}
