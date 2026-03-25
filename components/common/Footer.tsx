'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { MenuItem, SocialLink, Contact } from '@/types/site';

const socialIcons: Record<string, React.ReactNode> = {
  vk: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.915 13.028c-.388-.49-.277-.708 0-1.146.005-.005 3.208-4.431 3.538-5.932l.002-.001c.164-.547 0-.949-.793-.949h-2.624c-.668 0-.976.345-1.141.731 0 0-1.336 3.198-3.226 5.271-.61.599-.892.791-1.225.791-.164 0-.419-.192-.419-.739V5.949c0-.656-.187-.949-.74-.949H9.161c-.419 0-.668.306-.668.591 0 .622.945.765 1.043 2.515v3.797c0 .832-.151.985-.486.985-.892 0-3.057-3.211-4.34-6.886-.259-.713-.512-1.001-1.185-1.001H.9c-.749 0-.9.345-.9.731 0 .682.892 4.073 4.148 8.553C6.318 17.343 9.374 19 12.154 19c1.671 0 1.875-.368 1.875-1.001 0-2.922-.151-3.198.686-3.198.388 0 1.056.192 2.616 1.667C19.114 18.217 19.407 19 20.405 19h2.624c.748 0 1.127-.368.909-1.094-.499-1.527-3.871-4.668-4.023-4.878z" />
    </svg>
  ),
  telegram: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.77-1.17 3.35-1.37 3.73-1.37.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z" />
    </svg>
  ),
  youtube: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
    </svg>
  ),
  whatsapp: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.05 4.91A9.816 9.816 0 0012.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 012.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.16-.48-.27z" />
    </svg>
  ),
};

interface FooterProps {
  contactData: Contact | null;
}

const Footer: React.FC<FooterProps> = ({ contactData }) => {
  const contacts = contactData;

  const socialLinks: SocialLink[] = [];
  if (contacts?.telegram) {
    socialLinks.push({ id: 'tg', name: 'Telegram', icon: 'telegram', url: contacts.telegram });
  }
  if (contacts?.whatsapp) {
    socialLinks.push({
      id: 'wa',
      name: 'WhatsApp',
      icon: 'whatsapp',
      url: `https://wa.me/${contacts.whatsapp.replace(/[^\d]/g, '')}`,
    });
  }

  const menu: MenuItem[] = [
    { id: 1, title: 'Главная', path: '/' },
    { id: 2, title: 'Каталог', path: '/catalog' },
    { id: 3, title: 'Контакты', path: '/contacts' },
    { id: 4, title: 'Канал', path: '/channel' },
  ];

  return (
    <footer className="bg-[#0A192F] text-white pb-10 md:pb-0">
      {/* Accent top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#0095c6] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main grid */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg flex-shrink-0 bg-white">
                <Image
                  src="/images/logo.png"
                  alt="МультиАлтай"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-lg font-bold tracking-wide leading-none">
                <span className="text-[#00B4D8]">МУЛЬТИ</span>
                <span className="text-white">АЛТАЙ</span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Мы помогаем приобрести нашим партнерам земельные участки для строительства турбаз, отелей и частных домов в живописных местах Горного Алтая.
            </p>

            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#0095c6] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200"
                  >
                    {socialIcons[social.icon] ?? social.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0095c6] mb-5">
              Навигация
            </p>
            <ul className="space-y-3">
              {menu.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className="group flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -ml-1 transition-opacity" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0095c6] mb-5">
              Контакты
            </p>
            <ul className="space-y-4">
              {contacts?.phone && (
                <li>
                  <a
                    href={`tel:${contacts.phone.replace(/[^\d+]/g, '')}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-[#0095c6] flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                      <Phone className="w-4 h-4 text-gray-300 group-hover:text-white" />
                    </div>
                    <span className="text-gray-400 group-hover:text-white text-sm transition-colors duration-200">
                      {contacts.phone}
                    </span>
                  </a>
                </li>
              )}
              {contacts?.email && (
                <li>
                  <a
                    href={`mailto:${contacts.email}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-[#0095c6] flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                      <Mail className="w-4 h-4 text-gray-300 group-hover:text-white" />
                    </div>
                    <span className="text-gray-400 group-hover:text-white text-sm transition-colors duration-200">
                      {contacts.email}
                    </span>
                  </a>
                </li>
              )}
              {contacts?.office_address && (
                <li>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-gray-300" />
                    </div>
                    <span className="text-gray-400 text-sm leading-relaxed">
                      {contacts.office_address}
                    </span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} МультиАлтай. Все права защищены.
          </p>
          <Link
            href="/privacy-policy"
            className="text-gray-500 hover:text-[#0095c6] text-xs transition-colors duration-200"
          >
            Политика конфиденциальности
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
