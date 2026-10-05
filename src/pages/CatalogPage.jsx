import { useState } from 'react';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import ProductCard from '../components/ProductCard/ProductCard'; // Імпортуємо твою картку з ЛР2
import { mockProducts } from '../data/mockProducts';
import './catalog-page.css'; // Якщо створиш файл для стилів сторінки

function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Фільтрація масиву товарів за назвою
  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Функція для 10 варіанту: підсвічування тексту жирним
  const renderHighlightedName = (name, query) => {
    if (!query.trim()) return name;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = name.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <div className="catalog-page">
      <SearchPanel value={searchQuery} onChange={setSearchQuery} />
      
      <p className="catalog-page__results-count">
        Знайдено товарів: {filteredProducts.length}
      </p>

      {/* Умовний рендеринг: обробка порожнього результату */}
      {filteredProducts.length === 0 ? (
        <p className="catalog-page__empty-message">
          За запитом «{searchQuery}» нічого не знайдено. Спробуйте інше формулювання.
        </p>
      ) : (
        <div className="catalog-page__grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {filteredProducts.map((product) => (
            // Виводимо твою картку ProductCard
            <ProductCard 
              key={product.id} 
              {...product} 
              // Перезаписуємо name, щоб передати туди підсвічений текст (10 варіант)
              name={renderHighlightedName(product.name, searchQuery)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CatalogPage;