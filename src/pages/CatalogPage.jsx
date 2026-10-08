import { useState } from 'react';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import ProductList from '../components/ProductList/ProductList';
import { mockProducts } from '../data/mockProducts';
import './catalog-page.css';

function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('none');

  let result = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (sortOrder === 'price-asc') {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    result = [...result].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="catalog-page">
      <SearchPanel value={searchQuery} onChange={setSearchQuery} />

      <div style={{ margin: '12px 0' }}>
        <label htmlFor="sortSelect">Сортування: </label>
        <select
          id="sortSelect"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">Без сортування</option>
          <option value="price-asc">За ціною (від дешевих)</option>
          <option value="price-desc">За ціною (від дорогих)</option>
        </select>
      </div>

      <p className="catalog-page__results-count">
        Знайдено товарів: {result.length}
      </p>

      <ProductList products={result} />
    </div>
  );
}

export default CatalogPage;