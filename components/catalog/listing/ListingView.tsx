import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { LandPlotDetail } from '@/types/catalog';
import ListingGallery from './ListingGallery';
import ListingInfo from './ListingInfo';
import ListingDetails from './ListingDetails';
import ListingSidebar from './ListingSidebar';

interface ListingViewProps {
  listing: LandPlotDetail;
}

const ListingView: React.FC<ListingViewProps> = ({ listing }) => {
  const images = listing.media_files.filter(
    (f) =>
      f.type === 'image' ||
      (!f.type && /\.(jpg|jpeg|png|gif|webp)$/i.test(f.file_url ?? f.url ?? '')),
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="relative h-14 px-4 flex items-center justify-center">
          <Link
            href="/catalog"
            aria-label="Назад в каталог"
            className="absolute left-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:text-[#0095c6] transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-sm font-medium text-gray-800 truncate max-w-[70%]">{listing.title}</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 pt-4 sm:py-12 md:pt-20">
        {/* Хлебные крошки */}
        <nav className="hidden md:flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#0095c6] transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-[#0095c6] transition-colors">Каталог</Link>
          <span>/</span>
          <span className="text-gray-800 truncate max-w-xs">{listing.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка */}
          <div className="lg:col-span-2 space-y-8">
            <ListingGallery images={images} title={listing.title} />
            <ListingInfo listing={listing} />
            <ListingDetails listing={listing} />
          </div>

          {/* Правая колонка — сайдбар */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ListingSidebar listing={listing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingView;
