"use client";
import Image from 'next/image';
import styles from './scrollGallery.module.css';
import { useEffect, useState } from 'react';

const ScrollGallery = ({
    items = [],
    height = 420,
    gap = 12,
    radius = 16,
    className = '',
}) => {
    if (!items.length) return null;

    const [show,setShow] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setShow(window.innerWidth < 768)
        }

        handleResize();

        window.addEventListener("resize",handleResize)
       
        return () => {
            window.removeEventListener("resize",handleResize);
        }
    },[])

    if(!show){
        return null;
    }

    return (
        <div
            className={`${styles.scrollGallery}${className ? ` ${className}` : ''}`}
            style={{
                '--sg-gap': `${gap}px`,
                '--sg-radius': `${radius}px`,
                '--sg-height': `${height}px`,
            }}
            role="list"
            aria-label="Galerie cu lucrări realizate"
        >
            {items.map((item) => (
                <div key={item.image} className={styles.item} role="listitem">
                    <div className={styles.frame}>
                        <Image
                            src={item.image}
                            alt={item.alt || item.label || ''}
                            fill
                            sizes="82vw"
                        />
                        <span className={styles.overlay} aria-hidden="true" />
                    </div>

                </div>
            ))}
        </div>
    );
};

export default ScrollGallery;
