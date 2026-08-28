"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Upload, X, Info, GripVertical, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Modal from "../modal";
import Dropdown from "../dropdown";
import LoadingSpinner from "../LoadingSpinner";
import { GetProdusById } from "../../functions/fetchData";
import { EditeazaProdus } from "../../functions/EditeazaProdus";
import styles from "./addProductModal.module.css";

const MAX_SIZE = 5 * 1024 * 1024;
const MAX_IMAGES = 8;

function SortableThumbnail({ image, cover, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: image.id });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.thumbnail} ${isDragging ? styles.thumbnailDragging : ""}`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundImage: `url(${image.src})`,
      }}
      title={image.name}
    >
      <button
        type="button"
        className={styles.dragHandle}
        aria-label={`Mută ${image.name}`}
        {...attributes}
        {...listeners}
      >
        <GripVertical size={16} strokeWidth={2.2} />
      </button>

      <button
        type="button"
        className={styles.thumbnailRemove}
        onClick={() => onRemove(image.id)}
        aria-label={`Elimină ${image.name}`}
      >
        <X size={16} strokeWidth={2.2} />
      </button>

      {cover && <span className={styles.coverBadge}>Copertă</span>}
    </div>
  );
}

export default function EditProductModal({ open, produs, onClose, onSaved, onRefresh, categoryOptions }) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesError, setImagesError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [draggedId, setDraggedId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fileInput = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const draggedImage = images.find((image) => image.id === draggedId);

  const incarcaProdus = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await GetProdusById(produs.id);

      if (!res.ok) {
        setError(res.error);
        return;
      }

      const date = res.data;

      setName(date.titlu ?? "");
      setCategoryId(date.id_categorie ?? "");
      setPrice(date.pret === null || date.pret === undefined ? "" : String(date.pret));
      setDescription(date.descriere ?? "");
      setImagesError("");

      const galerie = [];

      if (date.poster) {
        galerie.push({
          id: "poster",
          src: date.poster,
          url: date.poster,
          name: "Imagine salvată",
          tip: "veche",
        });
      }

      for (const imagine of date.images_produs ?? []) {
        galerie.push({
          id: `veche-${imagine.id}`,
          src: imagine.url,
          url: imagine.url,
          name: "Imagine salvată",
          tip: "veche",
        });
      }

      setImages(galerie);
    } catch (err) {
      setError("A aparut o eroare neasteptata!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open || !produs) return;

    incarcaProdus();

    if (fileInput.current) fileInput.current.value = "";
  }, [open, produs]);

  const takeFiles = (files) => {
    const list = Array.from(files ?? []);
    if (!list.length) return;

    const valid = list.filter((file) => file.type.startsWith("image/"));
    if (valid.length < list.length) {
      setImagesError("Doar fișierele imagine pot fi încărcate.");
    }

    const underLimit = valid.filter((file) => file.size <= MAX_SIZE);
    if (underLimit.length < valid.length) {
      setImagesError("Unele imagini depășesc 5 MB și au fost ignorate.");
    }

    if (!underLimit.length) return;

    const liber = MAX_IMAGES - images.length;
    if (underLimit.length > liber) {
      setImagesError(`Poți încărca maximum ${MAX_IMAGES} imagini.`);
    }

    const adaugate = underLimit.slice(0, liber).map((file, index) => ({
      id: `noua-${Date.now()}-${index}-${file.name}`,
      src: URL.createObjectURL(file),
      name: file.name,
      file,
      tip: "noua",
    }));

    setImages((list) => [...list, ...adaugate]);

    if (fileInput.current) fileInput.current.value = "";
  };

  const removeImage = (id) =>
    setImages((list) =>
      list.filter((image) => {
        if (image.id !== id) return true;
        if (image.tip === "noua") URL.revokeObjectURL(image.src);
        return false;
      })
    );

  const reorderImages = ({ active, over }) => {
    setDraggedId(null);
    if (!over || active.id === over.id) return;

    setImages((list) => {
      const from = list.findIndex((image) => image.id === active.id);
      const to = list.findIndex((image) => image.id === over.id);
      return arrayMove(list, from, to);
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Numele produsului este obligatoriu.");
      return;
    }

    if (!images.length) {
      toast.error("Trebuie să încarci cel puțin o imagine.");
      return;
    }

    if (Number(price) < 0) {
      toast.error("Pretul trebuie sa fie mai mare de 0 RON");
      return;
    }

    setSaving(true);
    const res = await EditeazaProdus(
      produs.id,
      name.trim(),
      description.trim(),
      price === "" ? null : Number(price),
      categoryId === "" ? null : Number(categoryId),
      images.map((image) =>
        image.tip === "veche"
          ? { tip: "veche", url: image.url }
          : { tip: "noua", file: image.file }
      )
    );
    setSaving(false);

    if (!res.ok) {
      toast.error(res.error);
      return;
    }

    toast.success(res.message);
    onRefresh?.();

    const categorie = categoryOptions?.find((optiune) => optiune.valoare === res.data.id_categorie);

    onSaved?.({
      ...res.data,
      categorie: categorie?.eticheta ?? null,
    });

    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose} width={980}>
      <div className={styles.continut}>
        <h2 className={styles.titlu}>Editează produsul</h2>

        {loading ? (
          <LoadingSpinner text="Se încarcă produsul..." />
        ) : error ? (
          <div className={styles.field}>
            <p className={styles.fieldInfo}>
              <AlertCircle size={20} strokeWidth={2} />
              <span>{error}</span>
            </p>

            <div className={styles.actions}>
              <button type="button" className={styles.secondaryButton} onClick={onClose}>
                Renunță
              </button>
              <button type="button" className={styles.primaryButton} onClick={incarcaProdus}>
                Încearcă din nou
              </button>
            </div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={submit}>
            <div className={styles.fieldsRow}>
              <label className={styles.field}>
                <span className={styles.label}>Nume produs</span>
                <input
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex. Monument granit negru"
                  autoFocus
                />
              </label>

              <div className={styles.field}>
                <span className={styles.label}>Categorie</span>
                <Dropdown
                  valoare={categoryId}
                  optiuni={categoryOptions}
                  onSchimba={setCategoryId}
                  placeholder="Alege categoria"
                  eticheta="Categorie"
                />
              </div>

              <label className={styles.field}>
                <span className={styles.label}>Preț</span>
                <div className={styles.priceField}>
                  <input
                    className={styles.input}
                    type="number"
                    min="0"
                    step="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                  />
                  <span className={styles.currency}>RON</span>
                </div>
                <span style={{color:"grey"}}>Daca lasi necompletat, a pret va aparea <strong style={{color:"white"}}>Preț la cerere</strong></span>
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.label}>Descriere</span>
              <textarea
                className={styles.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Câteva rânduri despre material, finisaj și ce include prețul."
                rows={6}
              />
            </label>

            <div className={styles.field}>
              <span className={styles.label}>
                Imagini
                <span className={styles.counter}>
                  {images.length}/{MAX_IMAGES}
                </span>
              </span>

              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                multiple
                className={styles.fileInput}
                onChange={(e) => takeFiles(e.target.files)}
              />

              {images.length ? (
                <>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={({ active }) => setDraggedId(active.id)}
                    onDragCancel={() => setDraggedId(null)}
                    onDragEnd={reorderImages}
                  >
                    <SortableContext
                      items={images.map((image) => image.id)}
                      strategy={rectSortingStrategy}
                    >
                      <div className={styles.imagesGrid}>
                        {images.map((image, index) => (
                          <SortableThumbnail
                            key={image.id}
                            image={image}
                            cover={index === 0}
                            onRemove={removeImage}
                          />
                        ))}

                        {images.length < MAX_IMAGES && (
                          <button
                            type="button"
                            className={styles.thumbnailAdd}
                            onClick={() => fileInput.current?.click()}
                            aria-label="Adaugă imagini"
                          >
                            <Plus size={18} strokeWidth={2.2} />
                            <span>Adaugă</span>
                          </button>
                        )}
                      </div>
                    </SortableContext>

                    <DragOverlay>
                      {draggedImage && (
                        <span
                          className={styles.thumbnailGhost}
                          style={{ backgroundImage: `url(${draggedImage.src})` }}
                        />
                      )}
                    </DragOverlay>
                  </DndContext>

                  <p className={styles.fieldInfo}>
                    <Info size={20} strokeWidth={2} />
                    <span>
                      Prima imagine din listă este folosită drept copertă a produsului. Trage
                      imaginile pentru a schimba ordinea.
                    </span>
                  </p>
                </>
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
                    takeFiles(e.dataTransfer.files);
                  }}
                >
                  <span className={styles.dropzoneIcon}>
                    <Upload size={20} strokeWidth={1.9} />
                  </span>
                  <span className={styles.dropzoneTitle}>Încarcă imaginile produsului</span>
                  <span className={styles.dropzoneHint}>
                    Trage fișierele aici sau apasă pentru a alege
                  </span>
                </button>
              )}

              {imagesError && <span className={styles.fieldError}>{imagesError}</span>}
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.secondaryButton} onClick={onClose}>
                Renunță
              </button>
              <button type="submit" className={styles.primaryButton} disabled={saving}>
                {saving && <LoadingSpinner text={" "} />} Salvează
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
