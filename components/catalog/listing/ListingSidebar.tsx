import React from 'react';
import { X } from 'lucide-react';
import type { LandPlotDetail } from '@/types/catalog';
import ApplicationForm from './ApplicationForm';

interface ListingSidebarProps {
  listing: LandPlotDetail;
}

const ListingSidebar: React.FC<ListingSidebarProps> = ({ listing }) => {
  const isSold = listing.plot_status === 'sold';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        {isSold ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#00B4D8]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-7 h-7 text-[#00B4D8]" />
            </div>
            <h3 className="text-xl font-bold text-[#00B4D8] mb-2">Участок уже продан</h3>
            <p className="text-gray-600 mb-4">
              Это архивное объявление. Участок был реализован и больше не доступен для покупки.
            </p>
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-sm text-gray-500">
                Если у вас есть вопросы по другим участкам, свяжитесь с нами.
              </p>
            </div>
          </div>
        ) : (
          <ApplicationForm listingId={listing.id} listingTitle={listing.title} listingType="land_plot" />
        )}
      </div>
    </div>
  );
};

export default ListingSidebar;
