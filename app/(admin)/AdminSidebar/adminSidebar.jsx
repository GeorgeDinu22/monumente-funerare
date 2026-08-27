"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Package, LayoutGrid, BadgePercent } from "lucide-react";
import styles from "./adminSidebar.module.css";

const linkuri = [
  { href: "/admin-service", eticheta: "Acasă", Icon: House },
  { href: "/admin-service/produse", eticheta: "Produse", Icon: Package },
  { href: "/admin-service/categorii", eticheta: "Categorii", Icon: LayoutGrid },
  { href: "/admin-service/promotii", eticheta: "Promoții", Icon: BadgePercent },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Panou admin</div>

      <nav className={styles.nav}>
        {linkuri.map(({ href, eticheta, Icon }) => {
          const activ =
            href === "/admin-service"
              ? pathname === href
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`${styles.link} ${activ ? styles.activ : ""}`}
              aria-current={activ ? "page" : undefined}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{eticheta}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
