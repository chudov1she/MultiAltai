'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section bg-[#0A192F] relative overflow-hidden h-auto pt-6 pb-10 md:pb-10 md:pt-20">
      {/* Hero Content */}
      <div className="relative z-10 flex items-start py-6 sm:py-10">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-1 gap-8 sm:gap-10 lg:gap-12 items-start">
              {/* Left Side - Content */}
              <div className="text-center md:text-left">
                {/* Mobile Logo */}
                <div className="md:hidden flex flex-col items-center gap-2 mb-6">
                  <div className="w-20 h-20 relative bg-white rounded-full shadow-md">
                    <Image
                      src="/images/logo.png"
                      alt="MultiAltai Logo"
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  </div>
                  <span className="text-base font-bold text-white tracking-wide text-center whitespace-nowrap leading-tight">
                    <span className="text-[#00B4D8]">МУЛЬТИ</span>
                    <span className="text-white">АЛТАЙ</span>
                  </span>
                </div>
                {/* Main Headline */}
                <div className="mb-4 sm:mb-6">
                  <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl text-white leading-tight">
                    Продажа эксклюзивных
                  </h1>
                  <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl text-white leading-tight">
                    земельных участков
                  </h1>
                  <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl text-white leading-tight">
                    в Горном Алтае
                  </h1>
                </div>

                {/* Sub-headline */}
                <div className="mb-6 sm:mb-8">
                  <p className="text-base sm:text-lg lg:text-xl text-white leading-relaxed max-w-4xl">
                    Инвестируйте в земли, перспективные строительные проекты и готовый бизнес в экологически чистом регионе России.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex justify-start">
                  <Link 
                    href="/catalog" 
                    className="flex items-center justify-center bg-[#00B4D8] hover:bg-[#0095c6] text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl gap-2 sm:gap-3 w-full sm:w-auto"
                  >
                    <span className="text-center">Перейти в каталог</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panoramic Altai Landscape Image */}
      <div className="relative w-full mt-16 sm:mt-20 lg:mt-24 max-w-7xl mx-auto px-3 sm:px-0">
        <div className="w-full aspect-[9/16] sm:aspect-[16/9] lg:aspect-[21/9] relative overflow-hidden rounded-xl sm:rounded-2xl mb-16 sm:mb-20 lg:mb-24">
          <Image
            src="/images/altai-panorama.webp"
            alt="Панорамный пейзаж Горного Алтая"
            fill
            className="object-cover object-right"
            priority
          />
          {/* Dark overlay on the image */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Gradient overlay from top to bottom */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/90 via-[#0A192F]/50 to-transparent"></div> */}
        </div>
      </div>

      {/* Bottom Content Preview */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 lg:h-32 bg-gradient-to-t from-[#0A192F] to-transparent"></div> */}
    </section>
  );
};

export default Hero;