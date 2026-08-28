"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import Modal from "../modal";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./confirmModal.module.css";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  titlu = "Ești sigur?",
  mesaj = "Această acțiune nu poate fi anulată.",
  confirmLabel = "Șterge",
  cancelLabel = "Renunță",
}) {
  const [loading, setLoading] = useState(false);

  const confirma = async () => {
    setLoading(true);
    try {
      await onConfirm?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={loading ? () => {} : onClose} width={440}>
      <div className={styles.continut}>
        <span className={styles.iconita}>
          <AlertTriangle size={28} strokeWidth={2} />
        </span>

        <div className={styles.text}>
          <h2 className={styles.titlu}>{titlu}</h2>
          <p className={styles.mesaj}>{mesaj}</p>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            className={styles.dangerButton}
            onClick={confirma}
            disabled={loading}
          >
            {loading && <LoadingSpinner text={" "} />} {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
