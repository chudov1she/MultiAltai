import React from 'react';
import type { LandPlotDetail } from '@/types/catalog';

interface ListingDetailsProps {
  listing: LandPlotDetail;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({ listing }) => {
  const documents = listing.document_files;

  const featuresByType = listing.features.reduce<Record<string, typeof listing.features>>(
    (acc, f) => {
      const type = f.type_display || 'Особенности';
      if (!acc[type]) acc[type] = [];
      acc[type].push(f);
      return acc;
    },
    {},
  );

  if (documents.length === 0 && Object.keys(featuresByType).length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Документы */}
      {documents.length > 0 && (
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-[#011315] mb-4">Закреплённые документы</h2>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0095c6]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0095c6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#011315]">{doc.name || 'Документ'}</p>
                    <p className="text-sm text-gray-500">Вложение</p>
                  </div>
                </div>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#0095c6] hover:bg-[#007a9e] text-white rounded-xl transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Скачать
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Особенности участка */}
      {Object.keys(featuresByType).length > 0 && (
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-[#011315] mb-4">Особенности участка</h2>
          {Object.entries(featuresByType).map(([type, features]) => (
            <div key={type} className="mb-6 last:mb-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, i) => (
                  <div
                    key={`${feature.id}-${i}`}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#0095c6] flex-shrink-0" />
                    <span className="text-gray-700">{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
