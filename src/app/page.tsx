import Navbar from '@/app/components/home/Navbar';
import LayoutGrid from '@/app/components/home/LayoutGrid';
import AIChip from './components/home/AIChip';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <LayoutGrid />
      <AIChip/>
    </main>
  );
}