import { ShieldCheck } from "lucide-react";
import FormularLogin from "./formularLogin";
import styles from './login.module.css';


export default async function LoginPage(){

    return(
        <main className={styles.pagina}>
            <div className={styles.card}>
                <span className={styles.icon} aria-hidden="true">
                    <ShieldCheck size={28} strokeWidth={1.8} />
                </span>

                <h1 className={styles.titlu}>Panou admin</h1>

                <p className={styles.text}>
                    Autentificați-vă pentru a administra magazinul.
                </p>

                <FormularLogin />
            </div>
        </main>
    )
}
