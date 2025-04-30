'use client';

import { useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

export default function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const lastScrollY = useRef(0);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Detectar dirección del scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowButton(currentScrollY < lastScrollY.current || currentScrollY < 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Botón flotante en la esquina superior derecha */}
      <button
        onClick={toggleMenu}
        className={clsx(
          'fixed z-50 top-4 right-4 p-3 rounded-full shadow-xl transition-all bg-gradient-to-tr from-cyan-600 to-indigo-600 hover:scale-105 md:hidden',
          showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        aria-label="Menú"
      >
        {isOpen ? (
          <FaTimes className="text-white text-2xl" />
        ) : (
          <FaBars className="text-white text-2xl" />
        )}
      </button>

      {/* Menú lateral flotante */}
      <div
        className={clsx(
          'fixed inset-0 z-40 transition-transform duration-300 bg-zinc-900/80 backdrop-blur-xl md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col justify-between h-full p-8">
          <ul className="space-y-6 mt-20">
            {['Work', 'Servicios', 'Nosotros', 'Contacto'].map((section) => (
              <li key={section}>
                <Link
                  href={`#${section.toLowerCase()}`}
                  onClick={closeMenu}
                  className="text-2xl font-semibold text-white hover:text-cyan-400 transition-colors"
                >
                  {section}
                </Link>
              </li>
            ))}
          </ul>

          <div className="text-center">
            <Image
              src="/images/logo-navbar.png"
              alt="Logo"
              width={90}
              height={90}
              className="mx-auto"
            />
            <p className="text-gray-400 mt-3 text-sm">Innovando con IA desde 2023.</p>
          </div>
        </div>
      </div>
    </>
  );
}
