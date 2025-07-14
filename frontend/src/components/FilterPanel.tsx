import React from 'react';
import { type Category } from '../types';

interface FilterPanelProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  categories, 
  selectedCategories, 
  onCategoryChange 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Filtros</h2>
      
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 mb-3">Categorias</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label 
                htmlFor={`cat-${category}`} 
                className="ml-2 text-gray-700 capitalize"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={() => onCategoryChange('clear')}
        className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
      >
        Limpar Filtros
      </button>
    </div>
  );
};

export default FilterPanel;