
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  return (
    <div className="community-overlay">
      <button className="close-button" onClick={() => router.push('/')}>✕</button>
    </div>
  );
}
