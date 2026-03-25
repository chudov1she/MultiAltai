import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ListingGrid from "@/components/catalog/ListingGrid";
import type { LandPlot } from "@/types/catalog";

interface RecommendedListingsProps {
  listings: LandPlot[];
}

const RecommendedListings = ({ listings }: RecommendedListingsProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-[#0A192F]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[#0A192F] mb-6">
              Каталог{" "}
              <span className="text-[#00B4D8]">земельных</span>{" "}
              участков
            </h2>
            <p className="text-[18px] text-[#0A192F] max-w-5xl mx-auto leading-relaxed">
              Лучшие земельные участки в Горном Алтае, отобранные экспертами.
            </p>
          </div>

          <div className="mb-12">
            <ListingGrid listings={listings} showHelicopter={false} />
          </div>

          <div className="text-center">
            <Link
              href="/catalog"
              className="bg-[#00B4D8] hover:bg-[#0095c6] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-xl gap-2 sm:gap-3 flex items-center justify-center"
            >
              <span>Смотреть все объекты</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedListings;
