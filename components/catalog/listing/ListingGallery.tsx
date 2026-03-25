'use client';

import React, { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Thumbs, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import type { MediaFile } from '@/types/catalog';
import ListingLightbox from './ListingLightbox';

interface ListingGalleryProps {
  images: MediaFile[];
  title: string;
}

const ListingGallery: React.FC<ListingGalleryProps> = ({ images, title }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const mainSwiperRef = useRef<SwiperType | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const lightboxImages = images.map((image, index) => ({
    src: image.file_url ?? image.url ?? '',
    alt: image.description ?? `${title} — фото ${index + 1}`,
  }));

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-100 rounded-3xl h-80 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Нет изображений</p>
      </div>
    );
  }

  return (
    <>
      {/* ── Основная галерея ── */}
      <div className="relative rounded-2xl overflow-hidden select-none">
        {images.length > 1 && (
          <>
            <button
              onClick={() => mainSwiperRef.current?.slidePrev()}
              disabled={isBeginning}
              className="absolute left-3 top-1/2 -translate-y-[calc(50%+1.25rem)] z-20 w-11 h-11 hidden sm:flex items-center justify-center bg-black/50 hover:bg-black/70 disabled:opacity-0 text-white rounded-full backdrop-blur-sm transition-all duration-200 shadow-lg"
              aria-label="Предыдущий"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => mainSwiperRef.current?.slideNext()}
              disabled={isEnd}
              className="absolute right-3 top-1/2 -translate-y-[calc(50%+1.25rem)] z-20 w-11 h-11 hidden sm:flex items-center justify-center bg-black/50 hover:bg-black/70 disabled:opacity-0 text-white rounded-full backdrop-blur-sm transition-all duration-200 shadow-lg"
              aria-label="Следующий"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <Swiper
          spaceBetween={12}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 1.12 }, 1024: { slidesPerView: 1.18 } }}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Pagination, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          className="main-gallery-swiper"
          onSwiper={(s) => {
            mainSwiperRef.current = s;
            setIsBeginning(s.isBeginning);
            setIsEnd(s.isEnd);
          }}
          onSlideChange={(s) => {
            setIsBeginning(s.isBeginning);
            setIsEnd(s.isEnd);
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={`main-${index}`}>
              <div
                className="relative group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="w-full h-80 sm:h-[28rem] bg-gray-200 overflow-hidden">
                  <img
                    src={image.file_url ?? image.url}
                    alt={image.description ?? `${title} — фото ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    draggable={false}
                  />
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/60 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1 backdrop-blur-sm pointer-events-none">
                  <ZoomIn className="w-3.5 h-3.5" />
                  Увеличить
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Миниатюры (только если >2 фото) ── */}
      {images.length > 2 && (
        <div className="mt-3">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView="auto"
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Thumbs]}
            className="thumbs-swiper"
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={`thumb-${index}`}
                className="!w-16 !h-16 rounded-lg overflow-hidden cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
              >
                <img
                  src={image.file_url ?? image.url}
                  alt={`${title} миниатюра ${index + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* ── Lightbox ── */}
      <ListingLightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={closeLightbox}
      />

      <style jsx global>{`
        .main-gallery-swiper .swiper-pagination { bottom: 6px; }
        .main-gallery-swiper .swiper-pagination-bullet {
          background: #94a3b8; opacity: 1; width: 7px; height: 7px; transition: all 0.2s;
        }
        .main-gallery-swiper .swiper-pagination-bullet-active {
          background: #0095c6; transform: scale(1.4);
        }
        .thumbs-swiper .swiper-slide-thumb-active { opacity: 1 !important; }
        img { user-select: none; -webkit-user-select: none; }
      `}</style>
    </>
  );
};

export default ListingGallery;
