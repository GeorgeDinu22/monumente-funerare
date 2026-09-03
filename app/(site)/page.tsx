import { Suspense } from 'react';
import HeroSection from './Hero/heroSection';
import AnunturiSection from './Anunturi/anunturiSection';
import MagazinSection from './MagazinAcasa/magazinSection';
import BodyServiciiSection from './BodyServicii/bodyServiciiSection';
import DeCeNoiSection from './DeCeNoi/deCeNoiSection';
import RecenziiSection from './Recenzii/recenziiSection';
import GalerieSection from './Galerie/galerieSection';
import CtaSection from './Cta/ctaSection';
import FooterSection from './Footer/footerSection';

export default function Home() {
  return (
   <>
    <HeroSection/>
    <Suspense fallback={null}>
      <AnunturiSection/>
    </Suspense>
    <BodyServiciiSection/>
    {/* <MagazinSection/> */}
    <DeCeNoiSection/>
    <RecenziiSection/>
    <GalerieSection/>
    <CtaSection/>
    <FooterSection/>
   </>
  );
}
