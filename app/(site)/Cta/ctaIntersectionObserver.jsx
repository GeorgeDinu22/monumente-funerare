'use client'

import { useEffect, useRef } from "react";

export default function CtaIntersectionObserver({ className, children }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    entry.target.dataset.visible = "";
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.3 },
        );

        observer.observe(container);
        container.dataset.observing = "";

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
