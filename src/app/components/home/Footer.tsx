import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-900/80 bg-black py-12 px-6 mt-16 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        
        {/* Brand */}
        <div className="space-y-2">
          <p className="text-xl font-bold font-mono text-cyan-400 tracking-wider">INTELLIQBOT</p>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Intelliqbot. Todos los derechos reservados.</p>
        </div>

        {/* Local SEO Links */}
        <div className="flex flex-col items-center md:items-end">
          <p className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-3">Sedes & Soluciones Locales</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-4 text-xs font-mono">
            <Link href="/automatizacion-ventas-medellin" className="text-gray-500 hover:text-cyan-400 transition-colors">Medellín</Link>
            <span className="text-gray-800">|</span>
            <Link href="/automatizacion-ventas-bogota" className="text-gray-500 hover:text-purple-400 transition-colors">Bogotá</Link>
            <span className="text-gray-800">|</span>
            <Link href="/automatizacion-ventas-cali" className="text-gray-500 hover:text-green-400 transition-colors">Cali</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
