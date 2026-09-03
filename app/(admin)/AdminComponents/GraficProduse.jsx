"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./graficProduse.module.css";

const CULOARE_APEL = "#e3c100";
const CULOARE_WHATSAPP = "#25d366";

function scurteaza(titlu) {
  if (titlu.length <= 28) return titlu;
  return `${titlu.slice(0, 27)}…`;
}

function Continut({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const total = payload.reduce((suma, intrare) => suma + (intrare.value ?? 0), 0);

  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipTitlu}>{label}</span>

      {payload.map((intrare) => (
        <span key={intrare.dataKey} className={styles.tooltipRand}>
          <span className={styles.tooltipPunct} style={{ background: intrare.color }} />
          {intrare.name}
          <strong>{intrare.value}</strong>
        </span>
      ))}

      <span className={styles.tooltipTotal}>
        Total <strong>{total}</strong>
      </span>
    </div>
  );
}

export default function GraficProduse({ produse }) {
  if (!produse.length) {
    return (
      <div className={styles.gol}>
        <p className={styles.golTitlu}>Nicio apăsare înregistrată</p>
        <p className={styles.golMesaj}>
          Graficul se completează pe măsură ce vizitatorii apasă butoanele de contact din
          paginile de produs.
        </p>
      </div>
    );
  }

  const date = produse.map((produs) => ({
    ...produs,
    eticheta: scurteaza(produs.titlu),
  }));

  const inaltime = Math.max(240, date.length * 48 + 60);

  return (
    <div className={styles.grafic} style={{ height: inaltime }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={date} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid
            horizontal={false}
            stroke="color-mix(in srgb, #ffffff 10%, transparent)"
          />

          <XAxis
            type="number"
            allowDecimals={false}
            stroke="color-mix(in srgb, #ffffff 45%, transparent)"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            type="category"
            dataKey="eticheta"
            width={180}
            stroke="color-mix(in srgb, #ffffff 45%, transparent)"
            tick={{ fontSize: 12 }}
          />

          <Tooltip content={<Continut />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />

          <Legend
            wrapperStyle={{ fontSize: 13, paddingTop: 8 }}
            formatter={(valoare) => <span className={styles.legenda}>{valoare}</span>}
          />

          <Bar dataKey="apel" name="Apeluri" fill={CULOARE_APEL} radius={[0, 4, 4, 0]} />
          <Bar
            dataKey="whatsapp"
            name="WhatsApp"
            fill={CULOARE_WHATSAPP}
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
