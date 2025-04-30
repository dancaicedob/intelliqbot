import Navbar from '@/app/components/home/Navbar';
import LayoutGrid from '@/app/components/home/LayoutGrid';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <LayoutGrid />
    </main>
  );
}