import React from 'react';
import { Home } from 'lucide-react';
import type { Listing } from '@/types/catalog';
import { helicopterCatalog } from '@/lib/helicopters';
import ListingCard from './ListingCard';

interface ListingGridProps {
  listings: Listing[];
  showHelicopter?: boolean;
}

const helicopterListing = helicopterCatalog[0];

const ListingGrid: React.FC<ListingGridProps> = ({
  listings,
  showHelicopter = false,
}) => {
  if (listings.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <Home className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Объекты не найдены
        </h3>
        <p className="text-gray-500">В каталоге пока нет доступных объектов</p>
      </div>
    );
  }

  const items: Listing[] = [...listings];
  if (showHelicopter && listings.length > 0) {
    const mid = Math.floor(listings.length / 2);
    items.splice(mid, 0, helicopterListing);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default ListingGrid;
