import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = ''
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Limitar a quantidade de páginas visíveis
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    
    let visiblePages = [];
    
    if (start > 1) {
      visiblePages.push(1);
      if (start > 2) visiblePages.push('...');
    }
    
    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }
    
    if (end < totalPages) {
      if (end < totalPages - 1) visiblePages.push('...');
      visiblePages.push(totalPages);
    }
    
    return visiblePages;
  };

  return (
    <div id="paginator" className={`flex justify-center ${className}`}>
      <nav className="inline-flex rounded-md shadow">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-l-md text-sm font-medium ${
            currentPage === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          Anterior
        </button>
        
        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={`px-4 py-2 text-sm font-medium ${
              page === currentPage
                ? 'z-10 bg-blue-600 text-white'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            } ${typeof page === 'string' ? 'pointer-events-none' : ''}`}
            disabled={typeof page === 'string'}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-r-md text-sm font-medium ${
            currentPage === totalPages 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          Próximo
        </button>
      </nav>
    </div>
  );
};

export default Pagination;