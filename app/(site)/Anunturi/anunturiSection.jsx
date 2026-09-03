import { AnunturiCached } from "../../../cache/anunturiCached";
import AnunturiCarusel from "./anunturiCarusel";

export default async function AnunturiSection(){
    const anunturi = await AnunturiCached();

    if(!anunturi?.length) return null;

    return <AnunturiCarusel anunturi={anunturi} />;
}
