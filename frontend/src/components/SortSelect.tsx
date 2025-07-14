import React from 'react';

interface SortSelectProps {
  onSortChange: (option: string) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ onSortChange }) => {
  return (
    <div className="flex items-center">
      <label htmlFor="sort" className="mr-2 text-gray-600 text-sm">Ordenar por:</label>
      <select
        id="sort"
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-gray-300 rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="featured">Em destaque</option>
        <option value="price-low">Preço: menor para maior</option>
        <option value="price-high">Preço: maior para menor</option>
        <option value="name-asc">Nome: A-Z</option>
        <option value="name-desc">Nome: Z-A</option>
        <option value="rating">Melhor avaliados</option>
      </select>
    </div>
  );
};

export default SortSelect;