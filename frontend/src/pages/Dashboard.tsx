// src/App.tsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
// import FilterPanel from '../components/FilterPanel';
import SearchBar from '../components/SearchBar';
import SortSelect from '../components/SortSelect';
import Pagination from '../components/Pagination';
import { type Product, type Category } from '../types';
import { fetchProducts } from '../api';
import { PrinterIcon } from '@heroicons/react/16/solid';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productsPerPage = 2000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsData = await fetchProducts();
        const categoriesData = Array.from(new Set(productsData.map(p => p.category)));

        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar produtos. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.title.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      switch (sortOption) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [selectedCategories, searchQuery, sortOption, products]);


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const printCatalog = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md" role="alert">
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header id="header" className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold">Catálogo de Produtos</h1>
          <p className="mt-2 text-blue-100">Encontre os melhores produtos com os melhores preços</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros */}
          <div id="filter" className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Filtros</h2>

              <SearchBar onSearch={handleSearch} />

              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-3">Categorias</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`cat-${category}`}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
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
                onClick={() => setSelectedCategories([])}
                className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                Limpar Filtros
              </button>
              <button onClick={printCatalog} className="flex justify-center items-center mt-2 gap-2 cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full">
                <PrinterIcon className="h-5 w-5" />Imprimir
              </button>
            </div>
          </div>

          {/* Produtos */}
          <div className="lg:w-3/4">
            <div id="sort" className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <div className="text-gray-600 mb-4 sm:mb-0">
                Mostrando {filteredProducts.length} produtos
              </div>
              <SortSelect onSortChange={handleSortChange} />
            </div>

            {currentProducts.length === 0 ? (
              <div id="categories" className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="text-gray-500 mb-4">Nenhum produto encontrado com os filtros selecionados</div>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <>
                <div id="products" className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 printable">
                  {currentProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="mt-8"
                />
              </>
            )}
          </div>
        </div>
      </main>

     
    </div>
  );
};

export default Dashboard;