"use client";

import { useRef, useState } from "react";
import { Plus, Upload, X, Info, GripVertical } from "lucide-react";
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
import { AdaugaProdus } from "../../functions/AdaugaProdus";
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

export default function AddProductModal({ open, onClose, onSaved, onRefresh, categoryOptions }) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesError, setImagesError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [draggedId, setDraggedId] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInput = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const draggedImage = images.find((image) => image.id === draggedId);

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
      id: `${Date.now()}-${index}-${file.name}`,
      src: URL.createObjectURL(file),
      name: file.name,
      file,
    }));

    setImages((list) => [...list, ...adaugate]);

    if (fileInput.current) fileInput.current.value = "";
  };

  const removeImage = (id) =>
    setImages((list) =>
      list.filter((image) => {
        if (image.id !== id) return true;
        URL.revokeObjectURL(image.src);
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

  const reset = () => {
    setName("");
    setCategoryId("");
    setPrice("");
    setDescription("");
    setImages([]);
    setImagesError("");
    if (fileInput.current) fileInput.current.value = "";
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
    if(Number(price) < 0){
      toast.error("Pretul trebuie sa fie mai mare de 0 RON");
      return;
    }

    setSaving(true);
    const res = await AdaugaProdus(
      name.trim(),
      description.trim(),
      price === "" ? null : Number(price),
      categoryId ? Number(categoryId) : null,
      images.map((image) => image.file)
    );
    setSaving(false);

    if (!res.ok) {
      toast.error(res.error);
      return;
    }

    toast.success(res.message);
    onRefresh?.();

    const categorie = categoryOptions?.find((optiune) => optiune.valoare === categoryId);

    onSaved?.({
      id: Date.now(),
      created_at: new Date().toISOString(),
      id_categorie: categoryId ? Number(categoryId) : null,
      titlu: name.trim(),
      descriere: description.trim() || null,
      pret: price === "" ? null : Number(price),
      poster: images[0]?.src ?? null,
      categorie: categorie?.eticheta ?? null,
    });

    reset();
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose} width={980}>
      <div className={styles.continut}>
        <h2 className={styles.titlu}>Adaugă produs</h2>

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
              rows={4}
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
      </div>
    </Modal>
  );
}
