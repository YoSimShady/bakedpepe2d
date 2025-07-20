
import { useState, useEffect } from 'react';
import styles from '../styles/styles.module.css';

export default function Home() {
  const [showCommunity, setShowCommunity] = useState(false);
  const [showTrade, setShowTrade] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [muted, setMuted] = useState(false);
  const [audio] = useState(() => {
    if (typeof Audio === "undefined") return null;
    const a = new Audio('/ambient.mp3');
    a.volume = 0.3;
    return a;
  });
  const [bong] = useState(typeof Audio !== "undefined" ? new Audio('/bong.mp3') : null);

  useEffect(() => {
    if (audio) {
      audio.loop = true;
      if (!muted) audio.play();
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
    if (muted) {
      audio.play();
    } else {
      audio.pause();
    }
    setMuted(!muted);
    const sound = new Audio(muted ? '/on.mp3' : '/off.mp3');
    sound.play();
  };

  const playBong = () => {
    if (bong) {
      bong.currentTime = 0;
      bong.play();
    }
  };

  const copyAddress = () => {
    const address = "0x1234567890abcdef1234567890adcfdcf12345678";
    navigator.clipboard.writeText(address).then(() => {
      alert("Address copied to clipboard!");
    });
  };

  return (
    <div className={styles.container}>
      <img src="/pepe-room.png" className={styles.bgImg} alt="Background" />

      <div className={styles.dotCommunity} onClick={() => setShowCommunity(true)} />
      <div className={styles.dotAbout} onClick={() => setShowAbout(true)} />
      <div className={styles.dotTrade} onClick={() => setShowTrade(true)} />
      <div className={styles.dotBong} onClick={playBong} onMouseEnter={playBong} />

      <div className={styles.volumeButton} onClick={toggleMute}>
        {muted ? '🔇' : '🔊'}
      </div>

      {showCommunity && (
        <div className={styles.overlay}>
          <img src="/community_with_quote_final.png" className={styles.communityBoard} alt="COMMUNITY" />
          <a className={styles.xDot} href="https://x.com" target="_blank" />
          <a className={styles.tgDot} href="https://t.me/telegram" target="_blank" />
          <div className={styles.close} onClick={() => setShowCommunity(false)}>✕</div>
        </div>
      )}

      {showTrade && (
        <div className={styles.overlay}>
          <img src="/trade-background.png" className={styles.communityBoard} alt="TRADE" />
          <a className={styles.tradeDot} href="https://dexscreener.com" target="_blank" />
          <div className={styles.close} onClick={() => setShowTrade(false)}>✕</div>
        </div>
      )}

      {showAbout && (
        <div className={styles.overlay}>
          <div className={styles.aboutWrapper}>
            <img src="/about-background.png" className={styles.communityBoard} alt="ABOUT" />
            <div className={styles.copyBox}>
              <button className={styles.copyButton} onClick={copyAddress}>📋 Copy Address</button>
            </div>
          </div>
          <div className={styles.close} onClick={() => setShowAbout(false)}>✕</div>
        </div>
      )}
    </div>
  );
}
