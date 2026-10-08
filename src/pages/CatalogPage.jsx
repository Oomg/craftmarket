import { useEffect, useState } from 'react';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import ProductList from '../components/ProductList/ProductList';
import './catalog-page.css';

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('none');

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      setIsLoading(true);
      setError(null);

      // Варіант 10: timeout 5 секунд
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch('/api/products', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Сервер повернув статус ${response.status}`);
        }

        const data = await response.json();

        if (isActive) {
          setProducts(data);
        }
      } catch (err) {
        if (isActive) {
          if (err.name === 'AbortError') {
            setError('Час очікування вичерпано (більше 5 секунд)');
          } else {
            setError(err.message);
          }
        }
      } finally {
        clearTimeout(timeoutId);
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isActive = false;
    };
  }, []);

  // Фільтрація + сортування (з ЛР4)
  let result = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (sortOrder === 'price-asc') {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    result = [...result].sort((a, b) => b.price - a.price);
  }

  // Три стани
  if (isLoading) {
    return (
      <p style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
        Завантаження каталогу…
      </p>
    );
  }

  if (error) {
    return (
      <p
        style={{ textAlign: 'center', padding: '2rem', color: '#dc2626' }}
        role="alert"
      >
        Не вдалося завантажити каталог: {error}
      </p>
    );
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