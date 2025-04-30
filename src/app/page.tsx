'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/app/components/home/Navbar';
import LayoutGrid from '@/app/components/home/LayoutGrid';
import Loader from '@/app/components/home/Loader';

export default function HomePage() {
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    const fromExternal = performance?.navigation?.type === 0 || document.referrer === '';
    if (fromExternal) {
      const timeout = setTimeout(() => {
        setShowHome(true);
      }, 4000);
      return () => clearTimeout(timeout);
    } else {
      setShowHome(true);
    }
  }, []);

  if (!showHome) return <Loader />;

  return (
    <main className="relative animate-fade-in">
      <Navbar />
      <LayoutGrid />

      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-in-out;
        }
      `}</style>
    </main>
  );
}
