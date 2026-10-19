'use client';

import { useEffect, useRef, useState } from "react";
import { Rotate3d } from "lucide-react";
import styles from './modelViewer.module.css';

export default function ModelViewerSection(){
    const viewerRef = useRef(null);
    const [progres, setProgres] = useState(0);
    const [incarcat, setIncarcat] = useState(false);

    useEffect(() => {
        import('@google/model-viewer');

        const viewer = viewerRef.current;
        if (!viewer) return;

        const laProgres = (e) => setProgres(e.detail.totalProgress);
        const laIncarcare = () => setIncarcat(true);

        viewer.addEventListener('progress', laProgres);
        viewer.addEventListener('load', laIncarcare);

        return () => {
            viewer.removeEventListener('progress', laProgres);
            viewer.removeEventListener('load', laIncarcare);
        };
    }, []);

    return(
        <section id="model-3d" className={styles.modelViewer}>

            <div className={styles.scena}>
                <model-viewer
                    ref={viewerRef}
                    class={styles.viewer}
                    src="/monument.glb"
                    alt="Model 3D al unui monument funerar din granit"
                    camera-controls
                    auto-rotate
                    disable-zoom
                    touch-action="pan-y"
                    interaction-prompt="none"
                    shadow-intensity="1"
                    environment-image="neutral"
                    exposure="1"
                />

                {!incarcat && (
                    <div className={styles.incarcare} aria-live="polite">
                        <div className={styles.bara}>
                            <span style={{ transform: `scaleX(${progres})` }} />
                        </div>
                        <p>Se încarcă modelul…</p>
                    </div>
                )}

            </div>
        </section>
    )
}
