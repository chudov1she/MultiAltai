import React from "react";
import { ArrowRight, MapPin, Square } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSpecialOfferListing } from "@/lib/queries";

const SpecialOffer = async () => {
  const listing = await getSpecialOfferListing();
  const imageUrl = listing?.media_files[0]?.url ?? listing?.media_files[0]?.file_url ?? null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0A192F]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-4 sm:mb-6">
              Специальное предложение
            </h2>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl mx-2 sm:mx-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Изображение */}
              <div className="relative h-64 sm:h-80 lg:h-full min-h-[320px] rounded-t-2xl sm:rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Золотой Гектар"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0A192F] to-[#00B4D8]/40" />
                )}
                {/* Топографический паттерн поверх фото */}
                <div
                  className="absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{ backgroundImage: "url(/images/pattern-topo.svg)", backgroundSize: "cover" }}
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#00B4D8] text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                  ЭКСКЛЮЗИВНО
                </div>
              </div>

              {/* Контент */}
              <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-between rounded-b-2xl sm:rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none">
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl text-[#0A192F] mb-3 sm:mb-4">
                    Золотой Гектар
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600">Уникальный участок в сердце Алтая</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00B4D8]/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Square className="w-5 h-5 sm:w-6 sm:h-6 text-[#00B4D8]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-gray-500">Площадь</p>
                      <p className="text-[#0A192F] text-base sm:text-lg truncate">10 000 м²</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00B4D8]/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#00B4D8]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-gray-500">Расположение</p>
                      <p className="text-[#0A192F] text-base sm:text-lg truncate">Горный Алтай</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 sm:mb-8">
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Представляем эксклюзивный участок — 10 000 м² (1 га) на первой береговой линии
                    в Соузге.
                    <br className="hidden sm:block" />
                    Полная собственность и расположение на первой линии горной реки Катунь создают идеальные
                    условия для инвестиций в эко-курорт, турбазу или резиденцию.
                  </p>
                </div>

                <div className="mb-6 sm:mb-8">
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <div className="inline-flex items-center gap-2 bg-[#00B4D8]/10 text-[#0A192F] px-3 sm:px-4 py-2 rounded-full border border-[#00B4D8]/20">
                      <span className="text-xs sm:text-sm font-medium">Без обременений</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-[#00B4D8]/10 text-[#0A192F] px-3 sm:px-4 py-2 rounded-full border border-[#00B4D8]/20">
                      <span className="text-xs sm:text-sm font-medium">Первая береговая линия</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/catalog/land-plots/земля-золотой-гектар"
                  className="w-full bg-[#00B4D8] hover:bg-[#0095c6] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-colors duration-300 flex items-center justify-center gap-2 group text-sm sm:text-base"
                >
                  <span>Смотреть подробнее</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
