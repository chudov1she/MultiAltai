import React from 'react';
import type { Metadata } from 'next';
import { getCatalogListings } from '@/lib/queries';
import ListingGrid from '@/components/catalog/ListingGrid';
import Pagination from '@/components/catalog/Pagination';

export const metadata: Metadata = {
  title: 'Каталог земельных участков в Горном Алтае',
  description:
    'Каталог эксклюзивных земельных участков в Горном Алтае. Выберите идеальный участок для строительства турбазы, отеля или частного дома. Инвестиции в недвижимость Алтая.',
  keywords:
    'каталог участков Алтай, земельные участки каталог, купить участок Горный Алтай, недвижимость каталог, инвестиции в участки',
  openGraph: {
    title: 'Каталог земельных участков в Горном Алтае',
    description: 'Выберите эксклюзивный участок для инвестиций и развития в Горном Алтае',
    type: 'website',
    locale: 'ru_RU',
    url: 'https://multialtai.ru/catalog',
    siteName: 'МультиАлтай',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://multialtai.ru/catalog' },
};

const PAGE_SIZE = 20;

interface CatalogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);

  const { plots, total } = await getCatalogListings(currentPage, PAGE_SIZE);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-50 pt-4 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ListingGrid listings={plots} showHelicopter />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
