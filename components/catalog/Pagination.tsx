import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const delta = 2;
    const left = currentPage - delta;
    const right = currentPage + delta;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        pages.push(i);
      } else if (i === left - 1 || i === right + 1) {
        pages.push('ellipsis');
      }
    }
    return pages;
  };

  return (
    <div className="mt-12 flex justify-center items-center gap-2">
      {/* Назад */}
      {currentPage > 1 ? (
        <Link
          href={`?page=${currentPage - 1}`}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-[#0095c6] hover:text-[#0095c6] transition-colors shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Назад
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-medium text-gray-300 cursor-not-allowed shadow-sm">
          <ChevronLeft className="w-4 h-4" />
          Назад
        </span>
      )}

      {/* Номера страниц */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, i) =>
          page === 'ellipsis' ? (
            <span key={`e-${i}`} className="px-2 py-2 text-gray-400 text-sm">
              …
            </span>
          ) : page === currentPage ? (
            <span
              key={page}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0095c6] text-white text-sm font-semibold shadow-sm"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={`?page=${page}`}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:border-[#0095c6] hover:text-[#0095c6] transition-colors shadow-sm"
            >
              {page}
            </Link>
          ),
        )}
      </div>

      {/* Вперёд */}
      {currentPage < totalPages ? (
        <Link
          href={`?page=${currentPage + 1}`}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-[#0095c6] hover:text-[#0095c6] transition-colors shadow-sm"
        >
          Вперёд
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-medium text-gray-300 cursor-not-allowed shadow-sm">
          Вперёд
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </div>
  );
};

export default Pagination;
