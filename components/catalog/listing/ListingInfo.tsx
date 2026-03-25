'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { MapPin, Trees, Circle, FileText, Building2 } from 'lucide-react';
import type { LandPlotDetail } from '@/types/catalog';

function formatPrice(price: number | string | null | undefined): string {
  if (price === null || price === undefined || price === '') return 'Цена не указана';
  const n = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(n)) return 'Некорректная цена';
  return n.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });
}

interface ListingInfoProps {
  listing: LandPlotDetail;
}

const ListingInfo: React.FC<ListingInfoProps> = ({ listing }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const getFullAddress = () => {
    const parts: string[] = [];
    if (listing.location.locality) parts.push(listing.location.locality);
    if (listing.location.region) parts.push(listing.location.region);
    if (listing.location.address_line) parts.push(listing.location.address_line);
    return parts.length > 0 ? parts.join(', ') : 'Местоположение не указано';
  };

  const pricePerSotka = (() => {
    const area = parseFloat(listing.area);
    const price = parseFloat(listing.price);
    if (area > 0 && price > 0) return formatPrice(price / area);
    return null;
  })();

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Ошибка копирования:', err);
    }
  };

  const isSold = listing.plot_status_display === 'Продан';

  return (
    <div className="space-y-6">
      {/* Заголовок и цена */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-[#011315] leading-tight">
          {listing.title}
        </h1>

        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-5 h-5 text-[#0095c6]" />
          <span className="text-lg">{getFullAddress()}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="space-y-2">
            {isSold ? (
              <div className="text-3xl md:text-4xl font-bold text-[#00B4D8]">ПРОДАН</div>
            ) : (
              <>
                <div className="text-3xl md:text-4xl font-bold text-[#0095c6]">
                  {formatPrice(listing.price)}
                </div>
                {pricePerSotka && (
                  <div className="text-lg text-gray-600">{pricePerSotka} за сотку</div>
                )}
              </>
            )}
          </div>

          {listing.area && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Trees className="w-5 h-5 text-[#0095c6]" />
                <span className="text-sm font-medium text-gray-500">Площадь</span>
              </div>
              <div className="text-2xl text-[#011315]">
                {Number(listing.area).toFixed(0)} соток
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Описание */}
      {listing.description && (
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-[#011315] mb-4">Описание</h2>
          <div className="text-gray-700 leading-relaxed prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-2xl font-semibold text-[#011315] mb-3 mt-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-semibold text-[#011315] mb-3 mt-4">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-semibold text-[#011315] mb-2 mt-3">{children}</h3>,
                p: ({ children }) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-[#011315]">{children}</strong>,
                ul: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="text-gray-700">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#0095c6] pl-4 italic my-4 text-gray-600">{children}</blockquote>
                ),
                a: ({ href, children }) => (
                  <a href={href} className="text-[#0095c6] hover:text-[#007a9e] underline" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {listing.description}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Основные характеристики */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-[#011315] mb-4">Основные характеристики</h2>

        <div className="space-y-4">
          {/* Статус */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Circle className="w-4 h-4 text-[#0095c6] fill-[#0095c6]" />
              <span className="text-gray-600">Статус:</span>
            </div>
            <div className="ml-7">
              <span className="font-medium text-[#011315]">{listing.plot_status_display}</span>
            </div>
          </div>

          {/* Категория */}
          {listing.land_category && (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Trees className="w-4 h-4 text-[#0095c6]" />
                <span className="text-gray-600">Категория:</span>
              </div>
              <div className="ml-7">
                <span className="font-medium text-[#011315]">{listing.land_category.name}</span>
              </div>
            </div>
          )}

          {/* Разрешённое использование */}
          {listing.land_use_types.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-[#0095c6]" />
                <span className="text-gray-600">Виды разрешённого использования:</span>
              </div>
              <div className="ml-7">
                <span className="font-medium text-[#011315]">
                  {listing.land_use_types.map((u) => u.name).join(', ')}
                </span>
              </div>
            </div>
          )}

          {/* Кадастровые номера */}
          {listing.cadastral_numbers.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#0095c6]" />
                <span className="text-gray-600">Кадастровые номера:</span>
              </div>
              <div className="ml-7 space-y-2">
                {listing.cadastral_numbers.map((num, i) => (
                  <div
                    key={`${num}-${i}`}
                    className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                  >
                    <span className="font-mono text-sm text-[#011315]">{num}</span>
                    <button
                      onClick={() => handleCopy(num, i)}
                      className={`text-xs font-medium transition-all duration-200 px-2 py-1 rounded-md ${
                        copiedIndex === i
                          ? 'text-green-600 bg-green-100'
                          : 'text-[#0095c6] hover:text-[#007a9e] hover:bg-blue-50'
                      }`}
                    >
                      {copiedIndex === i ? 'Скопировано!' : 'Копировать'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
