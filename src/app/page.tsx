import Navbar from '@/app/components/home/Navbar';
import LayoutGrid from '@/app/components/home/LayoutGrid';
import FancyHeading from '@/app/components/home/FancyHeading';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <div className="pt-4">
        <FancyHeading />
      </div>
      <LayoutGrid />
    </main>
  );
}
