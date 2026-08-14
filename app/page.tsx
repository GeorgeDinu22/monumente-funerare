import HeroSection from './Hero/heroSection';
import MagazinSection from './Magazin/magazinSection';
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
    <MagazinSection/>
    <BodyServiciiSection/>
    <DeCeNoiSection/>
    <RecenziiSection/>
    <GalerieSection/>
    <CtaSection/>
    <FooterSection/>
   </>
  );
}
