import Link from "next/link";
import { companyInfo } from "../data/companyInfo";
import FooterSection from "../Footer/footerSection";
import styles from './confidentialitate.module.css';

export const metadata = {
    title: "Politica de Confidențialitate",
    description:
        "Cum prelucrăm datele cu caracter personal pe acest site: adresa IP folosită strict pentru protecție anti-abuz, statistici anonime și drepturile tale conform GDPR.",
    robots: {
        index: true,
        follow: true,
    },
};

const ULTIMA_ACTUALIZARE = "3 septembrie 2026";

const sectiuni = [
    { id: "operator", titlu: "Cine suntem" },
    { id: "date", titlu: "Ce date prelucrăm" },
    { id: "scopuri", titlu: "Scopurile și temeiul legal" },
    { id: "cookie", titlu: "Cookie-uri și stocare locală" },
    { id: "destinatari", titlu: "Cui transmitem datele" },
    { id: "durata", titlu: "Cât timp păstrăm datele" },
    { id: "drepturi", titlu: "Drepturile tale" },
    { id: "securitate", titlu: "Securitatea datelor" },
    { id: "minori", titlu: "Minori" },
    { id: "modificari", titlu: "Modificări ale politicii" },
    { id: "contact", titlu: "Contact" },
];

const dateColectate = [
    {
        titlu: "Adresa IP",
        detaliu:
            "Este citită automat din antetele cererii atunci când apeși butonul „Sună acum” sau „WhatsApp” pe pagina unui produs. O folosim exclusiv pentru a limita numărul de apăsări într-un interval scurt de timp, ca protecție împotriva abuzurilor automate.",
        nota: "Nu este salvată în baza noastră de date. Este păstrată temporar, sub forma unui contor, în memoria serviciului de limitare a cererilor și dispare automat în cel mult un minut.",
    },
    {
        titlu: "Statistici de interacțiune",
        detaliu:
            "Când apeși unul dintre butoanele de contact, salvăm un rând care conține doar: un identificator generat automat, data și ora, tipul acțiunii („apel” sau „whatsapp”) și produsul vizat.",
        nota: "Aceste înregistrări nu conțin adresa IP, numele, numărul de telefon sau orice alt element care te-ar putea identifica. Sunt date statistice anonime, folosite pentru a înțelege ce modele interesează vizitatorii.",
    },
    {
        titlu: "Date tehnice de funcționare",
        detaliu:
            "Serverele care găzduiesc site-ul înregistrează, ca orice server web, informații tehnice despre cereri (inclusiv adresa IP), pentru funcționarea și securitatea serviciului.",
        nota: "Aceste jurnale sunt gestionate de furnizorii de infrastructură, sunt păstrate pe termen scurt și nu sunt folosite de noi pentru a te identifica sau a-ți urmări comportamentul.",
    },
];

const scopuri = [
    {
        scop: "Protejarea site-ului împotriva cererilor automate și a abuzurilor",
        date: "Adresa IP",
        temei: "Interesul legitim (art. 6 alin. 1 lit. f GDPR) de a menține site-ul funcțional și securizat.",
    },
    {
        scop: "Măsurarea anonimă a interesului pentru produsele afișate",
        date: "Tipul acțiunii, produsul, data și ora",
        temei: "Nu se aplică GDPR, deoarece aceste date nu permit identificarea unei persoane fizice.",
    },
    {
        scop: "Reținerea temporară a faptului că ai apăsat deja un buton",
        date: "O valoare salvată local în browserul tău",
        temei: "Interesul legitim de a evita înregistrările duplicate. Este o stocare strict necesară funcționării.",
    },
];

const destinatari = [
    {
        nume: "Upstash",
        rol: "Serviciul care numără temporar cererile pe adresă IP, pentru limitarea abuzurilor.",
    },
    {
        nume: "Furnizorul de găzduire",
        rol: "Servirea paginilor și jurnalele tehnice ale serverului.",
    },
];

const drepturi = [
    {
        titlu: "Dreptul de acces",
        text: "Poți afla dacă prelucrăm date despre tine și care sunt acestea.",
    },
    {
        titlu: "Dreptul la rectificare",
        text: "Poți cere corectarea datelor inexacte care te privesc.",
    },
    {
        titlu: "Dreptul la ștergere",
        text: "Poți cere ștergerea datelor, în situațiile prevăzute de lege.",
    },
    {
        titlu: "Dreptul la restricționare",
        text: "Poți cere limitarea prelucrării în anumite situații.",
    },
    {
        titlu: "Dreptul la opoziție",
        text: "Te poți opune prelucrării întemeiate pe interesul legitim.",
    },
    {
        titlu: "Dreptul la portabilitate",
        text: "Poți primi datele într-un format structurat, citibil automat.",
    },
];

export default function ConfidentialitatePagina(){
    return(
        <>
            <main className={styles.pagina}>
                <header className={styles.hero}>
                    <h1 className={styles.titlu}>Politica de confidențialitate</h1>
                    <p className={styles.subtitlu}>
                        Acest site colectează un minim absolut de date. Mai jos îți explicăm,
                        pe înțelesul tuturor, ce se întâmplă atunci când îl vizitezi și ce
                        drepturi ai asupra datelor tale.
                    </p>
                    <p className={styles.actualizare}>
                        Ultima actualizare: {ULTIMA_ACTUALIZARE}
                    </p>
                </header>

                <div className={styles.continut}>
                    <nav className={styles.cuprins} aria-label="Cuprins">
                        <h2>Cuprins</h2>
                        <ol>
                            {sectiuni.map((sectiune, index) => (
                                <li key={sectiune.id}>
                                    <Link href={`#${sectiune.id}`}>
                                        <span className={styles.numar}>{index + 1}</span>
                                        {sectiune.titlu}
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <div className={styles.text}>
                        <section id="operator" className={styles.sectiune}>
                            <h2>1. Cine suntem</h2>
                            <p>
                                Site-ul este administrat de <strong>{companyInfo.nume}</strong>,
                                cu sediul în {companyInfo.adresa}, CUI {companyInfo.CUI}, în
                                calitate de operator de date cu caracter personal.
                            </p>
                            <p>
                                Pentru orice întrebare legată de datele tale, ne poți contacta
                                telefonic la{" "}
                                <Link href={companyInfo.telefon.href}>
                                    {companyInfo.telefon.afisat}
                                </Link>{" "}
                                sau la sediul menționat mai sus.
                            </p>
                        </section>

                        <section id="date" className={styles.sectiune}>
                            <h2>2. Ce date prelucrăm</h2>
                            <p>
                                Site-ul nu are formular de contact, nu îți cere să îți creezi
                                cont și nu folosește instrumente de analiză a traficului sau de
                                publicitate. Prelucrăm doar următoarele categorii:
                            </p>

                            <div className={styles.carduri}>
                                {dateColectate.map((element) => (
                                    <article key={element.titlu} className={styles.card}>
                                        <h3>{element.titlu}</h3>
                                        <p>{element.detaliu}</p>
                                        <p className={styles.nota}>{element.nota}</p>
                                    </article>
                                ))}
                            </div>

                            <p className={styles.accent}>
                                Nu colectăm nume, adrese de e-mail, numere de telefon sau date
                                de plată prin intermediul acestui site. Dacă ne suni sau ne
                                scrii pe WhatsApp, conversația se desfășoară direct între noi și
                                tine, prin operatorul de telefonie, respectiv prin aplicația
                                WhatsApp, conform politicilor acestora.
                            </p>
                        </section>

                        <section id="scopuri" className={styles.sectiune}>
                            <h2>3. Scopurile și temeiul legal</h2>
                            <p>
                                Prelucrăm datele descrise mai sus doar pentru scopurile
                                următoare, fiecare cu temeiul său legal:
                            </p>

                            <div className={styles.tabelWrapper}>
                                <table className={styles.tabel}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Scop</th>
                                            <th scope="col">Date folosite</th>
                                            <th scope="col">Temei legal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scopuri.map((rand) => (
                                            <tr key={rand.scop}>
                                                <td data-eticheta="Scop">{rand.scop}</td>
                                                <td data-eticheta="Date folosite">{rand.date}</td>
                                                <td data-eticheta="Temei legal">{rand.temei}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <p>
                                Nu luăm decizii automate care să producă efecte juridice asupra
                                ta și nu realizăm profilare.
                            </p>
                        </section>

                        <section id="cookie" className={styles.sectiune}>
                            <h2>4. Cookie-uri și stocare locală</h2>
                            <p>
                                Site-ul <strong>nu folosește cookie-uri de publicitate, de
                                analiză sau de urmărire</strong> și nu partajează date cu rețele
                                de socializare în scop de marketing.
                            </p>
                            <p>
                                Folosim o singură formă de stocare locală în browserul tău
                                („localStorage”): după ce apeși un buton de contact, salvăm
                                momentul acelei apăsări, ca să nu înregistrăm aceeași acțiune de
                                mai multe ori în decurs de 30 de minute. Această valoare rămâne
                                pe dispozitivul tău, nu ne este transmisă și nu conține date
                                despre persoana ta.
                            </p>
                            <p>
                                Fiind strict necesară funcționării corecte a site-ului, această
                                stocare nu necesită consimțământ prealabil. O poți șterge oricând
                                din setările browserului, prin ștergerea datelor site-ului.
                            </p>
                        </section>

                        <section id="destinatari" className={styles.sectiune}>
                            <h2>5. Cui transmitem datele</h2>
                            <p>
                                Nu vindem și nu închiriem date. Ne bazăm însă pe furnizori de
                                servicii care acționează ca persoane împuternicite și prelucrează
                                datele exclusiv la instrucțiunile noastre:
                            </p>

                            <ul className={styles.lista}>
                                {destinatari.map((furnizor) => (
                                    <li key={furnizor.nume}>
                                        <strong>{furnizor.nume}</strong> — {furnizor.rol}
                                    </li>
                                ))}
                            </ul>

                            <p>
                                Unii dintre acești furnizori pot stoca date în afara Spațiului
                                Economic European. În aceste cazuri, transferurile sunt acoperite
                                de garanțiile prevăzute de GDPR, în special clauzele contractuale
                                standard aprobate de Comisia Europeană.
                            </p>
                            <p>
                                Putem divulga informații și autorităților publice, atunci când
                                acest lucru ne este impus de lege.
                            </p>
                        </section>

                        <section id="durata" className={styles.sectiune}>
                            <h2>6. Cât timp păstrăm datele</h2>
                            <ul className={styles.lista}>
                                <li>
                                    <strong>Adresa IP</strong> — maximum un minut, cât durează
                                    fereastra de limitare a cererilor, după care contorul expiră
                                    automat.
                                </li>
                                <li>
                                    <strong>Statisticile anonime</strong> — pe durata în care ne
                                    sunt utile pentru a înțelege interesul pentru produse. Fiind
                                    date anonime, ele nu mai intră sub incidența GDPR.
                                </li>
                                <li>
                                    <strong>Jurnalele tehnice ale serverelor</strong> — conform
                                    politicilor de retenție ale furnizorilor de infrastructură, de
                                    regulă pentru o perioadă scurtă.
                                </li>
                            </ul>
                        </section>

                        <section id="drepturi" className={styles.sectiune}>
                            <h2>7. Drepturile tale</h2>
                            <p>
                                În calitate de persoană vizată, ai următoarele drepturi conform
                                Regulamentului (UE) 2016/679:
                            </p>

                            <div className={styles.carduri}>
                                {drepturi.map((drept) => (
                                    <article key={drept.titlu} className={styles.cardMic}>
                                        <h3>{drept.titlu}</h3>
                                        <p>{drept.text}</p>
                                    </article>
                                ))}
                            </div>

                            <p className={styles.accent}>
                                Reține că statisticile pe care le salvăm sunt anonime: nu conțin
                                niciun element prin care să te putem identifica, așa că nu putem
                                lega o anumită înregistrare de persoana ta. Din acest motiv, în
                                lipsa unor informații suplimentare care să permită identificarea,
                                nu putem da curs unei cereri de acces sau de ștergere pentru
                                aceste date.
                            </p>

                            <p>
                                Pentru exercitarea drepturilor, ne poți contacta folosind datele
                                de la secțiunea 11. Îți vom răspunde în cel mult o lună de la
                                primirea cererii.
                            </p>
                            <p>
                                Dacă apreciezi că ți-am încălcat drepturile, te poți adresa
                                Autorității Naționale de Supraveghere a Prelucrării Datelor cu
                                Caracter Personal (ANSPDCP), B-dul G-ral. Gheorghe Magheru nr.
                                28-30, sector 1, București, sau instanțelor de judecată.
                            </p>
                        </section>

                        <section id="modificari" className={styles.sectiune}>
                            <h2>8. Modificări ale politicii</h2>
                            <p>
                                Putem actualiza această politică atunci când se schimbă modul în
                                care funcționează site-ul sau când apar cerințe legale noi.
                                Versiunea în vigoare este întotdeauna cea publicată pe această
                                pagină, iar data ultimei actualizări este afișată la începutul
                                documentului.
                            </p>
                        </section>

                        <section id="contact" className={styles.sectiune}>
                            <h2>9. Contact</h2>
                            <p>
                                Pentru orice întrebare privind această politică sau datele tale
                                personale:
                            </p>
                            <ul className={styles.lista}>
                                <li>
                                    <strong>Telefon</strong> —{" "}
                                    <Link href={companyInfo.telefon.href}>
                                        {companyInfo.telefon.afisat}
                                    </Link>
                                </li>
                                <li>
                                    <strong>Adresă</strong> — {companyInfo.adresa}
                                </li>
                                <li>
                                    <strong>CUI</strong> — {companyInfo.CUI}
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>

            <FooterSection />
        </>
    )
}
