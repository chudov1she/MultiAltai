import React from "react";
import Hero from "@/components/sections/Hero";
import WhyAltai from "@/components/sections/WhyAltai";
import SpecialOffer from "@/components/sections/SpecialOffer";
import RecommendedListings from "@/components/sections/RecommendedListings";
import { getRecommendedListings } from "@/lib/queries";

export default async function Home() {
  const listings = await getRecommendedListings();

  return (
    <main>
      <Hero />
      <WhyAltai />
      <SpecialOffer />
      <RecommendedListings listings={listings} />
    </main>
  );
}
