import { useCallback, useEffect, useState } from 'react';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import ProductList from '../components/ProductList/ProductList';
import ReviewForm from '../components/ReviewForm/ReviewForm';
import PromoForm from '../components/PromoForm/PromoForm';
import ProductModal from '../components/ProductModal';

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [reviews, setReviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCloseModal = useCallback(() => setSelectedProduct(null), []);

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      setIsLoading(true);
      setError(null);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch('/api/products', { signal: controller.signal });
        if (!response.ok) throw new Error(`Сервер повернув статус ${response.status}`);
        const data = await response.json();
        if (isActive) setProducts(data);
      } catch (err) {
        if (isActive) {
          setError(
            err.name === 'AbortError'
              ? 'Час очікування вичерпано (більше 5 секунд)'
              : err.message
          );
        }
      } finally {
        clearTimeout(timeoutId);
        if (isActive) setIsLoading(false);
      }
    }

    loadProducts();
    return () => {
      isActive = false;
    };
  }, []);

  const handleReviewSubmit = (review) => {
    setReviews((prev) => [...prev, review]);
  };

  let result = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (sortOrder === 'price-asc') {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    result = [...result].sort((a, b) => b.price - a.price);
  }

  if (isLoading) {
    return <p className="p-8 text-center text-ink-500">Завантаження каталогу…</p>;
  }

  if (error) {
    return (
      <p className="p-8 text-center text-danger-600" role="alert">
        Не вдалося завантажити каталог: {error}
      </p>
    );
  }

  return (
    <div>
      <SearchPanel value={searchQuery} onChange={setSearchQuery} total={result.length} />

      <div className="my-3">
        <label htmlFor="sortSelect" className="mr-2 text-sm text-ink-800">
          Сортування:
        </label>
        <select
          id="sortSelect"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="rounded-control border border-ink-300 px-2 py-1 text-sm"
        >
          <option value="none">Без сортування</option>
          <option value="price-asc">За ціною (від дешевих)</option>
          <option value="price-desc">За ціною (від дорогих)</option>
        </select>
      </div>

      <p className="mb-2 text-sm text-ink-600">Знайдено товарів: {result.length}</p>

      <ProductList
        products={result}
        onOpenDetails={setSelectedProduct}
      />

      <ReviewForm onReviewSubmit={handleReviewSubmit} />
      <PromoForm />

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default CatalogPage;