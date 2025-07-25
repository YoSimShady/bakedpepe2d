
import { useState, useEffect } from 'react';
import styles from '../styles/mobileStyles.module.css';

export default function MobileView() {
  const [showCommunity, setShowCommunity] = useState(false);
  const [showTrade, setShowTrade] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [muted, setMuted] = useState(true);
  const [audio] = useState(typeof Audio !== "undefined" ? new Audio('/ambient.mp3') : null);
  const [bong] = useState(typeof Audio !== "undefined" ? new Audio('/bong.mp3') : null);

  useEffect(() => {
    if (audio) {
      audio.loop = true;
    }
  }, [audio]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  const toggleMute = () => {
    if (!audio) return;
    if (muted) audio.play();
    else audio.pause();
    setMuted(!muted);
    const fx = new Audio(muted ? '/on.mp3' : '/off.mp3');
    fx.play();
  };

  const playBong = () => {
    if (bong) {
      bong.currentTime = 0;
      bong.play();
    }
  };

  const copyAddress = () => {
  const address = "0x009Dc36A04aeBc6F536d3104583D1ea3382FEc9E";
  const input = document.createElement("input");
  input.value = address;
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, 99999); // pentru iOS
  document.execCommand("copy");
  document.body.removeChild(input);
  alert("Address copied!");
};


  return (
    <div className={styles.container}>
      <img src="/FIXED_pepe-room.png" className={styles.bg} alt="background" />

      <div className={styles.dotCommunityMobile} onClick={() => setShowCommunity(true)} />
      <div className={styles.dotAboutMobile} onClick={() => setShowAbout(true)} />
      <div className={styles.dotTradeMobile} onClick={() => setShowTrade(true)} />
      <div className={styles.dotBongMobile} onClick={playBong} onMouseEnter={playBong} />

      <div className={styles.volumeButton} onClick={toggleMute}>
        {muted ? '🔇' : '🔊'}
      </div>

      {showCommunity && (
        <div className={styles.overlay}>
          <img src="/FIXED_community_with_quote_final.png" className={styles.overlayImg} alt="COMMUNITY" />
          <a className={styles.xDot} href="https://x.com/BPepe60603" target="_blank" />
          <a className={styles.tgDot} href="https://t.me/+MWrZMShOHxY2ODdk" target="_blank" />
          <div className={styles.close} onClick={() => setShowCommunity(false)}>✕</div>
        </div>
      )}

      {showTrade && (
        <div className={styles.overlay}>
          <img src="/FIXED_trade-background.png" className={styles.overlayImg} alt="TRADE" />
          <a className={styles.tradeDot} href="https://dexscreener.com" target="_blank" />
          <div className={styles.close} onClick={() => setShowTrade(false)}>✕</div>
        </div>
      )}

      {showAbout && (
        <div className={styles.overlay}>
          <img src="/FIXED_about-background.png" className={styles.overlayImg} alt="ABOUT" />
          <div className={styles.copyBox}>
            <button className={styles.copyButton} onClick={copyAddress}>
              Copy Address
            </button>
          </div>
          <div className={styles.close} onClick={() => setShowAbout(false)}>✕</div>
        </div>
      )}
    </div>
  );
}

