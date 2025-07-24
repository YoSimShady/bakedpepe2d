
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DesktopView = dynamic(() => import('./DesktopView'), { ssr: false });
const MobileView = dynamic(() => import('./MobileView'), { ssr: false });

export default function Home() {
  const [isMobilePortrait, setIsMobilePortrait] = useState(null);

  useEffect(() => {
    const checkOrientation = () => {
      const isPhone = /android|iphone|ipad|mobile/i.test(navigator.userAgent.toLowerCase());
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;
      setIsMobilePortrait(isPhone && isPortrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  if (isMobilePortrait === null) {
    return <div style={{ color: 'white', textAlign: 'center' }}>Loading...</div>;
  }

  return isMobilePortrait ? <MobileView /> : <DesktopView />;
}
