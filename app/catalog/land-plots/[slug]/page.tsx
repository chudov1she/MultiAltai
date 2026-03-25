import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLandPlotBySlug } from '@/lib/queries';
import ListingView from '@/components/catalog/listing/ListingView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getLandPlotBySlug(decodeURIComponent(slug));
  if (!listing) return { title: 'Объект не найден' };

  return {
    title: listing.title,
    description: listing.description?.slice(0, 160) || `Земельный участок ${listing.title} в Горном Алтае`,
    openGraph: {
      title: listing.title,
      description: listing.description?.slice(0, 160),
      images: listing.media_files[0]
        ? [{ url: listing.media_files[0].url }]
        : [],
    },
  };
}

export default async function ListingPage({ params }: Props) {
  const { slug } = await params;
  const listing = await getLandPlotBySlug(decodeURIComponent(slug));

  if (!listing) return notFound();

  return <ListingView listing={listing} />;
}
