"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import Modal from "../modal";
import { AdaugaAnunt } from "../../functions/AdaugaAnunt";
import styles from "./addCategoryModal.module.css";
import LoadingSpinner from "../LoadingSpinner";

const MAX_SIZE = 5 * 1024 * 1024;

export default function AddAnuntModal({ open, onClose, onSaved, onRefresh }) {
  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState("");
  const [posterError, setPosterError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInput = useRef(null);

  useEffect(() => {
    if (!poster) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(poster);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [poster]);

  const reseteaza = () => {
    setPoster(null);
    setPosterError("");
    setDragging(false);
    if (fileInput.current) fileInput.current.value = "";
  };

  const inchide = () => {
    reseteaza();
    onClose?.();
  };

  const takeFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPosterError("Fișierul trebuie să fie o imagine.");
      return;
    }

    if (file.size > MAX_SIZE) {
      setPosterError("Imaginea depășește 5 MB.");
      return;
    }

    setPoster(file);
    setPosterError("");
  };

  const removePoster = () => {
    setPoster(null);
    setPosterError("");
    if (fileInput.current) fileInput.current.value = "";
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!poster) {
      toast.error("Imaginea anunțului este obligatorie.");
      return;
    }

    setSaving(true);
    const res = await AdaugaAnunt(poster);
    setSaving(false);

    if (!res.ok) {
      toast.error(res.error);
      return;
    }

    toast.success(res.message);
    onRefresh?.();

    if (res.data) onSaved?.(res.data);

    inchide();
  };

  return (
    <Modal open={open} onClose={saving ? () => {} : inchide} width={560}>
      <div className={styles.continut}>
        <h2 className={styles.titlu}>Adaugă anunț</h2>

        <form className={styles.form} onSubmit={submit}>
          <div className={styles.field}>
            <span className={styles.label}>Imaginea anunțului</span>

            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={(e) => takeFile(e.target.files?.[0])}
            />

            {poster ? (
              <div className={styles.preview}>
                <span
                  className={styles.previewImage}
                  style={{ backgroundImage: `url(${preview})` }}
                >
                  <button
                    type="button"
                    className={styles.previewRemove}
                    onClick={removePoster}
                    aria-label="Elimină imaginea"
                  >
                    <X size={16} strokeWidth={2} />
                  </button>
                </span>

                <div className={styles.previewText}>
                  <span className={styles.previewName}>{poster.name}</span>
                  <button
                    type="button"
                    className={styles.linkAction}
                    onClick={() => fileInput.current?.click()}
                  >
                    Schimbă imaginea
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className={`${styles.dropzone} ${dragging ? styles.dropzoneActive : ""}`}
                onClick={() => fileInput.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  takeFile(e.dataTransfer.files?.[0]);
                }}
              >
                <span className={styles.dropzoneIcon}>
                  <Upload size={20} strokeWidth={1.9} />
                </span>
                <span className={styles.dropzoneTitle}>Încarcă o imagine</span>
                <span className={styles.dropzoneHint}>
                  Trage fișierul aici sau apasă pentru a alege
                </span>
              </button>
            )}

            {posterError && <span className={styles.fieldError}>{posterError}</span>}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={inchide}
              disabled={saving}
            >
              Renunță
            </button>
            <button type="submit" className={styles.primaryButton} disabled={saving}>
              {saving && <LoadingSpinner text={" "} />} Salvează
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
