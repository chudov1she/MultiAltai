'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

export interface LightboxImage {
  src: string;
  alt: string;
}

interface ListingLightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
}

export default function ListingLightbox({
  images,
  initialIndex = 0,
  open,
  onClose,
}: ListingLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === images.length - 1;

  // Sync slide when caller changes initialIndex
  useEffect(() => {
    if (open) {
      setActiveIndex(initialIndex);
      swiperRef.current?.slideTo(initialIndex, 0);
    }
  }, [open, initialIndex]);

  // Keyboard navigation + Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') swiperRef.current?.slideNext();
      if (e.key === 'ArrowLeft') swiperRef.current?.slidePrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handlePrev = useCallback(() => swiperRef.current?.slidePrev(), []);
  const handleNext = useCallback(() => swiperRef.current?.slideNext(), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed inset-0 z-[200] flex flex-col bg-black"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографий"
        >
          {/* ── Шапка ── */}
          <div className="shrink-0 flex items-center justify-between px-4 h-14 border-b border-white/10">
            <span className="text-white/50 text-sm tabular-nums font-medium">
              {activeIndex + 1}
              <span className="text-white/30"> / {images.length}</span>
            </span>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ── Главная область слайдов ── */}
          <div className="relative flex-1 flex items-center min-h-0 overflow-hidden">

            {/* Кнопка «Назад» */}
            <AnimatePresence>
              {!isFirst && (
                <motion.button
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 hidden sm:flex w-11 h-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Кнопка «Вперёд» */}
            <AnimatePresence>
              {!isLast && (
                <motion.button
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                  onClick={handleNext}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 hidden sm:flex w-11 h-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
                  aria-label="Следующее фото"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              )}
            </AnimatePresence>

            <Swiper
              initialSlide={initialIndex}
              spaceBetween={24}
              slidesPerView={1}
              grabCursor
              centeredSlides
              modules={[A11y]}
              onSwiper={(s) => {
                swiperRef.current = s;
              }}
              onSlideChange={(s) => setActiveIndex(s.activeIndex)}
              className="!w-full !h-full"
            >
              {images.map((img, i) => (
                <SwiperSlide
                  key={i}
                  className="!flex items-center justify-center"
                >
                  <motion.img
                    src={img.src}
                    alt={img.alt}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="max-w-full object-contain select-none pointer-events-none"
                    style={{ maxHeight: 'calc(100dvh - 130px)' }}
                    draggable={false}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* ── Полоска миниатюр ── */}
          {images.length > 1 && (
            <div className="shrink-0 border-t border-white/10 flex items-center gap-2 px-4 overflow-x-auto py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] md:py-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideTo(i)}
                  className={`shrink-0 h-12 w-16 rounded-lg overflow-hidden transition-all duration-200 outline-none ${
                    activeIndex === i
                      ? 'ring-2 ring-offset-1 ring-offset-black ring-[#0095c6] opacity-100'
                      : 'opacity-35 hover:opacity-60'
                  }`}
                  aria-label={`Фото ${i + 1}`}
                  aria-current={activeIndex === i}
                >
                  <img
                    src={img.src}
                    alt=""
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
