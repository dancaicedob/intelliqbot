import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-900/80 bg-black py-14 px-6 mt-16 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left mb-10">

        {/* Brand */}
        <div className="space-y-3">
          <p className="text-xl font-bold font-mono text-cyan-400 tracking-wider">INTELLIQBOT</p>
          <p className="text-gray-500 text-sm leading-relaxed">
            Ingeniería de Automatización y Sistemas Inteligentes. Software, IoT e industria.
          </p>
        </div>

        {/* Servicios */}
        <div>
          <p className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-4">Servicios</p>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link href="/servicios" className="text-gray-500 hover:text-white transition-colors">Todos los servicios</Link>
            <Link href="/servicios/automatizacion-ia" className="text-gray-500 hover:text-cyan-400 transition-colors flex items-center gap-2 justify-center md:justify-start">
              <span>🤖</span> IA & Software
            </Link>
            <Link href="/servicios/iot-conectividad" className="text-gray-500 hover:text-emerald-400 transition-colors flex items-center gap-2 justify-center md:justify-start">
              <span>📡</span> IoT, Arduino & ESP32
            </Link>
            <Link href="/servicios/automatizacion-fisica" className="text-gray-500 hover:text-orange-400 transition-colors flex items-center gap-2 justify-center md:justify-start">
              <span>⚙️</span> Automatización Industrial
            </Link>
          </div>
        </div>

        {/* Local SEO */}
        <div>
          <p className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-4">Ciudades</p>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link href="/automatizacion-ventas-medellin" className="text-gray-500 hover:text-cyan-400 transition-colors">Automatización en Medellín</Link>
            <Link href="/automatizacion-ventas-bogota" className="text-gray-500 hover:text-purple-400 transition-colors">Automatización en Bogotá</Link>
            <Link href="/automatizacion-ventas-cali" className="text-gray-500 hover:text-green-400 transition-colors">Automatización en Cali</Link>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-900 pt-6 text-center">
        <p className="text-gray-700 text-xs font-mono">© {new Date().getFullYear()} Intelliqbot · Automatización, IoT y Software a Medida en Colombia</p>
      </div>
    </footer>
  );
}
