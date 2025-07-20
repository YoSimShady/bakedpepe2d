
import { useRouter } from 'next/router';

export default function Community() {
  const router = useRouter();

  return (
    <div className="community-overlay">
      <img src="/community-poster.png" alt="Community Poster" className="community-image" />
      <button className="close-button" onClick={() => router.push('/')}>✕</button>
      <div className="community-icons">
        <img src="/x-logo.png" alt="X" className="icon" />
        <img src="/telegram-logo.png" alt="Telegram" className="icon" />
      </div>
    </div>
  );
}
