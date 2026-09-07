# Plan metadata SEO – toate paginile

Stack: Next 16.3, App Router, `cacheComponents: true`. Site în română, `lang="ro"` deja setat.

## Ce există acum (audit)

| Rută | Metadata acum | Problemă |
|---|---|---|
| `(site)/layout.tsx` | `title: "Monumente Funerare"` + descriere | Fără `title.template`, fără `metadataBase`, fără OpenGraph, fără canonical, fără iconițe |
| `/` (home) | nimic propriu, moștenește layout-ul | Titlul e doar "Monumente Funerare" – pierde cuvintele-cheie principale (servicii funerare, non-stop) |
| `/servicii-funerare` | titlu + descriere OK | Fără canonical/OG |
| `/constructii-funerare` | titlu + descriere OK | Fără canonical/OG |
| `/magazin` | titlu + descriere OK | Fără canonical/OG |
| `/magazin/[categorie]` | `generateMetadata` | **Bug**: `ProduseCached(slug)` e apelat fără `await` și rezultatul e un array, nu un obiect cu `nume`/`descriere`. Titlul iese `undefined — Magazin` |
| `/magazin/[categorie]/[produs]` | `generateMetadata` | Descrierea e textul complet al produsului (prea lung, cu newline-uri). Fără imagine OG, fără canonical. Când produsul lipsește întoarce `{}` |
| `/confidentialitate` | titlu + descriere + robots | OK |
| `(auth)`, `(admin)` | `noindex, nofollow` | OK, rămân așa |
| `sitemap`, `robots`, `opengraph-image`, `icon` | **lipsesc** | Google nu are listă de URL-uri, iar share-ul pe WhatsApp/Facebook nu are imagine |

Alte observații:
- `NEXT_PUBLIC_URL=localhost:3000` nu are protocol. Pentru `metadataBase` e nevoie de un URL complet (`https://domeniu.ro`). Propun o variabilă nouă `NEXT_PUBLIC_SITE_URL` ca să nu stricăm link-ul de WhatsApp care folosește deja `NEXT_PUBLIC_URL`.
- Tabela `categorii` are doar `id, slug, titlu, poster` – nu există descriere pe categorie. Descrierea meta pentru categorie va fi generată dintr-un șablon.
- `companyInfo.CUI` e `123456` și adresa e "Soseua Odaii nr 131" (fără oraș). Pentru SEO local trebuie orașul în titluri/descrieri. Recenziile menționează București, Ploiești, Târgoviște, Pitești, Slatina. **De confirmat**: zona principală este București / Ilfov?

## Reguli pentru titluri și descrieri

- Titlu: maxim 60 de caractere cu tot cu sufixul de brand. Cuvântul-cheie principal la început.
- Descriere: 140–160 de caractere, cu un apel la acțiune (telefon) unde are sens. Fără newline.
- Șablon global: `%s | Monumente Funerare` (sufix de 21 caractere). Titlul paginii trebuie să aibă maxim 39 de caractere. Pagina principală folosește `title.absolute`.
- Fiecare pagină publică primește `alternates.canonical`.
- OpenGraph se definește o singură dată în layout și se suprascrie doar unde există imagine specifică (produs).

## Textele propuse

### `/` (home)
- Titlu (absolute): `Servicii Funerare Complete Non-stop | Monumente Funerare` (56)
- Descriere: `Servicii funerare complete, disponibile non-stop, și monumente funerare din granit și marmură. Sicrie, transport, acte de deces, cavouri și cruci. Sunați: 0753 381 189.` (~160)

### `/servicii-funerare`
- Titlu: `Servicii Funerare Non-stop, Pachete Complete` (38 + sufix = 59)
- Descriere: `Pachete funerare de la 2.900 lei: sicriu, transport funerar, acte de deces, îmbălsămare, coroane și repatriere din Europa. Un singur telefon și ne ocupăm de tot.`

### `/constructii-funerare`
- Titlu: `Construcții Funerare: Cavouri și Cripte` (39 + sufix = 60)
- Descriere: `Construim cavouri, cripte, borduri și placări din granit și marmură, cu echipă proprie de montaj. Măsurători gratuite în cimitir și ofertă fără costuri ascunse.`

### `/magazin`
- Titlu: `Magazin Monumente și Cruci Funerare` (35 + sufix = 56)
- Descriere: `Monumente funerare, cruci, borduri, placări și accesorii din granit și marmură, grupate pe categorii. Prețuri afișate, livrare și montaj cu echipa noastră.`

### `/magazin/[categorie]` (dinamic)
- Titlu: `${categorie.titlu} – Modele și Prețuri` (ex: `Cruci din Granit – Modele și Prețuri | Monumente Funerare`)
- Descriere șablon: `${categorie.titlu} din granit și marmură, cu prețuri afișate. Vedeți toate modelele disponibile, alegeți-l pe cel potrivit și sunați pentru ofertă și montaj.`
- Sursa: `CategoriiCached()` + `find` după slug (funcționează și când categoria nu are produse).
- Categorie inexistentă: `title: "Categorie negăsită"`, `robots: { index: false }`.

### `/magazin/[categorie]/[produs]` (dinamic)
- Titlu: `${produs.titlu}` (cu sufix din template). Dacă depășește 60, rămâne așa – Google taie singur.
- Descriere: primele ~155 de caractere din `produs.descriere`, cu newline-urile înlocuite cu spațiu, tăiate la cuvânt întreg, plus `…`. Dacă produsul are preț, prefix `${pret} RON – `.
- OpenGraph: `images: [produs.poster]`, `type: "website"`.
- Canonical: `/magazin/${categorie}/${produs.slug}`.
- Produs inexistent: `title: "Produs negăsit"`, `robots: { index: false }` (pagina oricum face `notFound()`).

### `/confidentialitate`
- Rămâne cum e, se adaugă doar canonical.

## Fișiere noi

1. `app/(site)/data/seo.js`
   - `siteUrl` (din `NEXT_PUBLIC_SITE_URL`), `numeSite`, `descriereImplicita`, `ogImage`, `locale: "ro_RO"`.
   - `truncheazaDescriere(text, max = 155)` – funcția folosită la produse.
2. `app/(site)/opengraph-image.jpg` (1200×630) + `opengraph-image.alt.txt`
   - Se folosește o poză reprezentativă (ex. `public/servicii-funerare-images/image1.jpeg`, redimensionată). Next generează automat tag-urile `og:image` și `twitter:image` pentru tot site-ul.
3. `app/icon.png` (512×512) și `app/apple-icon.png` (180×180)
   - Din `public/logov5.png` (4800×4609, se reduce). `favicon.ico` rămâne.
4. `app/sitemap.js`
   - Rute statice: `/`, `/servicii-funerare`, `/constructii-funerare`, `/magazin`, `/confidentialitate`.
   - Rute dinamice: toate categoriile (`CategoriiCached`) și toate produsele. Pentru produse e nevoie de o funcție nouă în `cache/` care selectează `slug, created_at, categorii(slug)` pentru toate produsele, cu `cacheTag("produse")` ca să se invalideze odată cu ele.
   - `lastModified` din `created_at` (nu există `updated_at`).
5. `app/robots.js`
   - `allow: "/"`, `disallow: ["/admin-service", "/login", "/api"]`, `sitemap: ${siteUrl}/sitemap.xml`.

## Fișiere modificate

1. `.env` – adaugă `NEXT_PUBLIC_SITE_URL=https://domeniul-real.ro` (în dev poate fi `http://localhost:3000`).
2. `app/(site)/layout.tsx`
   - `metadataBase: new URL(siteUrl)`
   - `title: { default: "...", template: "%s | Monumente Funerare" }`
   - `description`, `openGraph: { type, locale, siteName }`, `robots: { index: true, follow: true }`, `alternates: { canonical: "/" }`.
3. `app/(site)/page.tsx` – export `metadata` cu `title.absolute` și descrierea de mai sus.
4. `app/(site)/servicii-funerare/page.jsx`, `constructii-funerare/page.jsx`, `magazin/page.jsx`, `confidentialitate/page.jsx` – titluri noi + `alternates.canonical`.
5. `app/(site)/magazin/[categorie]/page.jsx` – rescrie `generateMetadata` (fix bug + șablon + canonical + fallback).
6. `app/(site)/magazin/[categorie]/[produs]/page.jsx` – rescrie `generateMetadata` (trunchiere + OG image + canonical + fallback). De eliminat și `setTimeout(500)` din `BodyPage`, e rămas de la testare.

## Compatibilitate cu Cache Components

- `generateMetadata` din paginile dinamice citește `params` (runtime) și apelează funcții cu `"use cache"`. Pagina are deja `Suspense` în jurul componentei care citește `params`, deci Next nu va ridica eroarea „blocking prerender metadata".
- `sitemap.js` folosește doar funcții cache-uite, deci rămâne static și se regenerează la `revalidateTag("produse" | "categorii")` din admin.

## Etape de implementare

1. **Fundație** – `seo.js`, `NEXT_PUBLIC_SITE_URL`, layout (`metadataBase`, template, OG, canonical), `opengraph-image`, `icon`, `apple-icon`.
2. **Pagini statice** – home, servicii, construcții, magazin, confidențialitate.
3. **Pagini dinamice** – fix categorie, produs (trunchiere, OG, canonical, fallback noindex).
4. **Crawling** – `sitemap.js`, `robots.js`, funcția cache pentru lista completă de produse.
5. **Opțional, după** – JSON-LD (`LocalBusiness` pe home, `Product` cu preț pe produs, `BreadcrumbList` pe magazin), `verification.google` pentru Search Console, oraș în `companyInfo.adresa`.

## Verificare (în dev-ul deja pornit)

- `view-source:` pe fiecare pagină: `<title>`, `<meta name="description">`, `<link rel="canonical">`, `og:image`.
- `http://localhost:3000/sitemap.xml` și `/robots.txt` răspund și conțin toate URL-urile.
- `/magazin/categorie-inexistenta` și `/magazin/x/produs-inexistent` au `noindex`.
- Share de test pe WhatsApp cu un link de produs: apare poza produsului.
- După deploy: Google Rich Results Test + trimis sitemap-ul în Search Console.

## De confirmat înainte de implementare

1. Domeniul real al site-ului (pentru `NEXT_PUBLIC_SITE_URL` și canonical).
2. Orașul / zona principală pentru SEO local (București?). Se adaugă în titlul home-ului și în descrieri dacă încape.
3. Imaginea pentru `opengraph-image` (o poză cu monument sau logo pe fundal).
