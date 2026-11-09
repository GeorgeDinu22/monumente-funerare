import { Suspense } from 'react';
import type { Metadata } from 'next';
import { titluImplicit, descriereImplicita, imagineOpenGraph, openGraphBaza } from './data/seo';
import HeroSection from './Hero/heroSection';
import AnunturiSection from './Anunturi/anunturiSection';
import BodyServiciiSection from './BodyServicii/bodyServiciiSection';
import ModelViewerSection from './ModelViewer/modelViewerSection';
import DeCeNoiSection from './DeCeNoi/deCeNoiSection';
import RecenziiSection from './Recenzii/recenziiSection';
import GalerieSection from './Galerie/galerieSection';
import CtaSection from './Cta/ctaSection';
import FooterSection from './Footer/footerSection';

const titlu = titluImplicit;
const descriere = descriereImplicita;

export const metadata: Metadata = {
  title: { absolute: titlu },
  description: descriere,
  alternates: { canonical: '/' },
  openGraph: {
    ...openGraphBaza,
    title: titlu,
    description: descriere,
    url: '/',
    ...imagineOpenGraph,
  },
  twitter: {
    card: 'summary_large_image',
    title: titlu,
    description: descriere,
    images: ['/opengraph-image.jpg'],
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
