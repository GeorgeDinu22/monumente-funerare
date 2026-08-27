'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import styles from './accordionGallery.module.css';

const AccordionGallery = ({
    items = [],
    defaultIndex = 2,
    accentColor = '#ffffff',
    overlayColor = '#060010',
    textColor = '#ffffff',
    height = 60,
    mobileHeight = 520,
    gap = 10,
    radius = 16,
    expandRatio = 0.52,
    orientation = 'horizontal',
    duration = 0.6,
    ease = 'power3.out',
    parallax = 0.5,
    tilt = 8,
    stagger = 0.06,
    trigger = 'hover',
    showLabels = true,
    grayscale = true,
    sizes = '(min-width: 1024px) 60vw, 100vw',
    priority = false,
    className = '',
}) => {
    const rootRef = useRef(null);
    const panelRefs = useRef([]);
    const mediaRefs = useRef([]);
    const barRefs = useRef([]);
    const textRefs = useRef([]);
    const tlRef = useRef(null);
    const firstRunRef = useRef(true);
    const mediaSizeRef = useRef(320);
    const columnRef = useRef(orientation === 'vertical');

    const vertical = orientation === 'vertical';
    const count = items.length;
    const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0)));

    const applyLayout = useCallback(
        (animate) => {
            const panels = panelRefs.current;
            if (!panels.length) return;

            const prefersReduced =
                typeof window !== 'undefined' && window.matchMedia
                    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    : false;

            const column = columnRef.current;
            const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
            const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
            const mediaSize = mediaSizeRef.current;

            tlRef.current?.kill();
            const dur = animate && !prefersReduced ? duration : 0;
            const tl = gsap.timeline();

            panels.forEach((panel, i) => {
                if (!panel) return;
                const isActive = i === active;
                const media = mediaRefs.current[i];
                const bar = barRefs.current[i];
                const text = textRefs.current[i];

                const rot = isActive ? 0 : i < active ? tilt : -tilt;
                const rotProp = column ? { rotateX: -rot, rotateY: 0 } : { rotateY: rot, rotateX: 0 };

                tl.to(
                    panel,
                    {
                        flexGrow: isActive ? grow : 1,
                        ...rotProp,
                        '--ag-dim': isActive ? 0 : 0.35,
                        duration: dur,
                        ease,
                    },
                    0
                );

                if (media) {
                    const drift = Math.max(-1.5, Math.min(1.5, active - i));
                    const shift = drift * parallax * mediaSize * 0.06;
                    const gray = grayscale ? (isActive ? 0 : 1) : 0;
                    tl.to(
                        media,
                        {
                            xPercent: -50,
                            yPercent: -50,
                            x: column ? 0 : isActive ? 0 : shift,
                            y: column ? (isActive ? 0 : shift) : 0,
                            '--ag-gray': gray,
                            duration: dur,
                            ease,
                        },
                        0
                    );
                }

                if (showLabels && bar && text) {
                    if (isActive) {
                        tl.to(
                            [bar, text],
                            { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger },
                            0
                        );
                    } else {
                        tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
                    }
                }
            });

            tlRef.current = tl;
        },
        [active, count, expandRatio, duration, ease, tilt, parallax, grayscale, showLabels, stagger]
    );

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        const measure = () => {
            const column = getComputedStyle(el).flexDirection === 'column';
            columnRef.current = column;

            const rect = el.getBoundingClientRect();
            const total = column ? rect.height : rect.width;
            const usable = Math.max(total - gap * (count - 1), 120);
            const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
            mediaSizeRef.current = size;
            el.style.setProperty('--ag-media-size', `${size}px`);
            applyLayout(!firstRunRef.current);
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [applyLayout, gap, count, expandRatio]);

    useEffect(() => {
        applyLayout(!firstRunRef.current);
        firstRunRef.current = false;
    }, [applyLayout]);

    useEffect(
        () => () => {
            tlRef.current?.kill();
        },
        []
    );

    const handleEnter = (i) => {
        if (trigger === 'hover') setActive(i);
    };

    const handleClick = (i, e) => {
        if (i !== active) {
            e.preventDefault();
            setActive(i);
        }
    };

    const handleKeyDown = (i, e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((i + 1) % count);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((i - 1 + count) % count);
        }
    };

    if (!count) return null;

    return (
        <div
            ref={rootRef}
            className={`${styles.accordionGallery}${vertical ? ` ${styles.vertical}` : ''}${className ? ` ${className}` : ''}`}
            style={{
                '--ag-accent': accentColor,
                '--ag-overlay': overlayColor,
                '--ag-text': textColor,
                '--ag-gap': `${gap}px`,
                '--ag-radius': `${radius}px`,
                '--ag-height': vertical ? `${Math.round(height * 1.6)}px` : `${height}px`,
                '--ag-height-mobile': `${mobileHeight}px`,
            }}
            role="list"
            aria-label="Galerie cu lucrări realizate"
        >
            {items.map((item, i) => {
                const isActive = i === active;
                const Tag = item.link ? 'a' : 'div';
                return (
                    <Tag
                        key={item.image}
                        ref={(el) => {
                            panelRefs.current[i] = el;
                        }}
                        className={styles.panel}
                        style={{ borderRadius: `${radius}px` }}
                        href={item.link || undefined}
                        onClick={(e) => handleClick(i, e)}
                        onMouseEnter={() => handleEnter(i)}
                        onFocus={() => setActive(i)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        role="listitem"
                        tabIndex={0}
                        aria-current={isActive ? 'true' : undefined}
                        aria-label={item.label}
                    >
                        <span className={styles.frame}>
                            <span
                                className={styles.media}
                                ref={(el) => {
                                    mediaRefs.current[i] = el;
                                }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.alt || item.label || ''}
                                    fill
                                    sizes={sizes}
                                    priority={priority}
                                    draggable={false}
                                />
                            </span>
                            <span className={styles.overlay} aria-hidden="true" />
                        </span>
                    </Tag>
                );
            })}
        </div>
    );
};

export default AccordionGallery;
