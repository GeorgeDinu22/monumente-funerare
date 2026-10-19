import { Suspense } from 'react';
import type { Metadata } from 'next';
import { numeSite, imagineOpenGraph } from './data/seo';
import HeroSection from './Hero/heroSection';
import AnunturiSection from './Anunturi/anunturiSection';
import BodyServiciiSection from './BodyServicii/bodyServiciiSection';
import ModelViewerSection from './ModelViewer/modelViewerSection';
import DeCeNoiSection from './DeCeNoi/deCeNoiSection';
import RecenziiSection from './Recenzii/recenziiSection';
import GalerieSection from './Galerie/galerieSection';
import CtaSection from './Cta/ctaSection';
import FooterSection from './Footer/footerSection';

const titlu = `Servicii Funerare Complete Non-stop | ${numeSite}`;
const descriere =
  'Servicii funerare complete, disponibile non-stop, și monumente funerare din granit și marmură. Sicrie, transport, acte de deces, cavouri și cruci. Sunați oricând.';

export const metadata: Metadata = {
  title: { absolute: titlu },
  description: descriere,
  alternates: { canonical: '/' },
  openGraph: {
    title: titlu,
    description: descriere,
    url: '/',
    ...imagineOpenGraph,
  },
};

export default function Home() {
  return (
   <>
    <HeroSection/>
    <Suspense fallback={null}>
      <AnunturiSection/>
    </Suspense>
    <BodyServiciiSection/>
    <ModelViewerSection/>
    <DeCeNoiSection/>
    <RecenziiSection/>
    <GalerieSection/>
    <CtaSection/>
    <FooterSection/>
   </>
  );
}
