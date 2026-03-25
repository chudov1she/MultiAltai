import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Plane, MapPin } from 'lucide-react';
import { getHelicopterBySlug } from '@/lib/helicopters';
import ListingGallery from '@/components/catalog/listing/ListingGallery';
import ApplicationForm from '@/components/catalog/listing/ApplicationForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const helicopter = getHelicopterBySlug(decodeURIComponent(slug));
  if (!helicopter) return { title: 'Объект не найден' };

  return {
    title: helicopter.title,
    description: helicopter.description ?? undefined,
    openGraph: {
      title: helicopter.title,
      description: helicopter.description ?? undefined,
      images: helicopter.media_files[0] ? [{ url: helicopter.media_files[0].url }] : [],
    },
  };
}

export default async function HelicopterPage({ params }: Props) {
  const { slug } = await params;
  const helicopter = getHelicopterBySlug(decodeURIComponent(slug));

  if (!helicopter) return notFound();

  const images = helicopter.media_files.filter(
    (f) =>
      f.type === 'image' ||
      (!f.type && /\.(jpg|jpeg|png|gif|webp)$/i.test(f.file_url ?? f.url ?? '')),
  );

  const formatPrice = (p: string) => {
    const num = parseFloat(p);
    if (isNaN(num)) return p;
    return new Intl.NumberFormat('ru-RU').format(num) + ' ₽';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Мобильный хедер */}
      <header className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="relative h-14 px-4 flex items-center justify-center">
          <Link
            href="/catalog"
            aria-label="Назад в каталог"
            className="absolute left-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:text-[#0095c6] transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-sm font-medium text-gray-800 truncate max-w-[70%]">{helicopter.title}</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 pt-4 sm:py-12 md:pt-20">
        {/* Хлебные крошки */}
        <nav className="hidden md:flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#0095c6] transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-[#0095c6] transition-colors">Каталог</Link>
          <span>/</span>
          <span className="text-gray-800 truncate max-w-xs">{helicopter.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка */}
          <div className="lg:col-span-2 space-y-8">
            <ListingGallery images={images} title={helicopter.title} />

            {/* Основная информация */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#0095c6]/10 flex items-center justify-center shrink-0">
                  <Plane className="w-5 h-5 text-[#0095c6]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#011315]">{helicopter.title}</h1>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0095c6]" />
                    <span>{helicopter.location.locality}, {helicopter.location.region}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">{helicopter.full_description}</p>

              {/* Особенности */}
              {helicopter.features.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Оснащение</h3>
                  <div className="flex flex-wrap gap-2">
                    {helicopter.features.map((f) => (
                      <span
                        key={f}
                        className="bg-gray-50 border border-gray-200 text-gray-700 text-sm px-3 py-1.5 rounded-xl"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Технические характеристики */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#011315] mb-5">Технические характеристики</h2>
              <div className="divide-y divide-gray-100">
                {helicopter.specs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between py-3">
                    <span className="text-gray-500 text-sm">{spec.label}</span>
                    <span className="text-gray-800 font-medium text-sm text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка — сайдбар */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Цена */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="mb-1 text-gray-500 text-sm">Стоимость</div>
                <div className="text-3xl font-bold text-[#011315] mb-5">
                  {formatPrice(helicopter.price)}
                </div>
                <ApplicationForm listingId={String(helicopter.id)} listingTitle={helicopter.title} listingType="general" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
