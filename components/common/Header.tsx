'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, X } from 'lucide-react';
import ContactModal from './ContactModal';
import type { Contact } from '@/types/site';

interface HeaderProps {
  contactData?: Contact | null;
}

const navLinks = [
  { title: 'Главная', path: '/' },
  { title: 'Каталог', path: '/catalog' },
  { title: 'Канал', path: '/channel' },
  { title: 'Контакты', path: '/contacts' },
];

const Header: React.FC<HeaderProps> = ({ contactData = null }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-sm flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="МультиАлтай"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-sm font-bold tracking-wide leading-none">
                <span className="text-[#00B4D8]">МУЛЬТИ</span>
                <span className="text-gray-800">АЛТАЙ</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-lg
                    ${isActive(link.path)
                      ? 'text-[#0095c6]'
                      : 'text-gray-600 hover:text-[#0095c6] hover:bg-gray-50'
                    }`}
                >
                  {link.title}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#0095c6] rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="flex items-center gap-2 bg-[#0095c6] hover:bg-[#007a9e] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                Связаться
              </button>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-[#0095c6] hover:bg-gray-50 transition-colors"
              aria-label="Открыть меню"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 lg:hidden flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white shadow-sm">
                  <Image src="/images/logo.png" alt="МультиАлтай" width={32} height={32} className="object-contain w-full h-full" />
                </div>
                <span className="text-sm font-bold">
                  <span className="text-[#00B4D8]">МУЛЬТИ</span>
                  <span className="text-gray-800">АЛТАЙ</span>
                </span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-gray-500 hover:text-[#0095c6] hover:bg-gray-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer links */}
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200
                    ${isActive(link.path)
                      ? 'bg-[#0095c6]/10 text-[#0095c6]'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#0095c6]'
                    }`}
                >
                  {link.title}
                </Link>
              ))}
            </nav>

            {/* Drawer CTA */}
            <div className="px-4 pb-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsContactModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#0095c6] hover:bg-[#007a9e] text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                Связаться с нами
              </button>
            </div>
          </div>
        </>
      )}

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        contactData={contactData}
      />
    </>
  );
};

export default Header;
