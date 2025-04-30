'use client'; // Necesario para usar hooks y estado en Next.js

import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 md:hidden">
      {/* Botón para abrir/cerrar el menú */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 p-3 bg-gray-900 rounded-lg shadow-lg hover:bg-gray-800 transition-all"
      >
        {isOpen ? (
          <FaTimes className="text-white text-2xl" />
        ) : (
          <FaBars className="text-white text-2xl" />
        )}
      </button>

      {/* Menú desplegable */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 w-3/4 h-screen bg-gray-900/95 backdrop-blur-md transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Botón de cerrar dentro del menú */}
        <button
          onClick={closeMenu}
          className="absolute top-4 right-4 p-3 text-white hover:text-accent transition-all"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Contenido del menú */}
        <div className="container mx-auto p-8 h-full flex flex-col justify-between">
          <ul className="flex flex-col space-y-6">
            <li>
              <Link
                href="#work"
                onClick={closeMenu}
                className="text-2xl font-bold text-white hover:text-accent transition-all"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                href="#servicios"
                onClick={closeMenu}
                className="text-2xl font-bold text-white hover:text-accent transition-all"
              >
                Servicios
              </Link>
            </li>
            <li>
              <Link
                href="#nosotros"
                onClick={closeMenu}
                className="text-2xl font-bold text-white hover:text-accent transition-all"
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link
                href="#contacto"
                onClick={closeMenu}
                className="text-2xl font-bold text-white hover:text-accent transition-all"
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* Logo y frase en la parte inferior */}
          <div className="text-center mb-[50px]">
            <Image
              src="/images/logo-navbar.png"
              alt="Logo"
              width={100}
              height={100}
              className="mx-auto"
            />
            <p className="text-gray-400 mt-4">
              Innovando con IA desde 2023.
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}