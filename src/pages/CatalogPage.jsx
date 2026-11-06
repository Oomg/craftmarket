import { useCallback, useState } from 'react';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import ProductList from '../components/ProductList/ProductList';
import ReviewForm from '../components/ReviewForm/ReviewForm';
import PromoForm from '../components/PromoForm/PromoForm';
import ProductModal from '../components/ProductModal';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { useProducts } from '../hooks/useProducts';
import { useMakers } from '../hooks/useMakers';
import { getErrorMessage } from '../utils/getErrorMessage';

function CatalogPage() {
  const { status, products, error, retry } = useProducts();
  const {
    status: makersStatus,
    makers,
    error: makersError,
    retry: retryMakers,
  } = useMakers();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [reviews, setReviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCloseModal = useCallback(() => setSelectedProduct(null), []);

  const handleReviewSubmit = (review) => {
    setReviews((prev) => [...prev, review]);
  };

  let content;

  if (status === 'loading') {
    content = <Loader />;
  } else if (status === 'error') {
    content = (
      <ErrorMessage
        title="Каталог не завантажено"
        message={getErrorMessage(error)}
        onRetry={retry}
      />
    );
  } else {
    let result = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOrder === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    content = (
      <>
        <SearchPanel
          value={searchQuery}
          onChange={setSearchQuery}
          total={result.length}
        />

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

        <p className="mb-2 text-sm text-ink-600" aria-live="polite">
          Знайдено товарів: {result.length}
        </p>

        <ProductList products={result} onOpenDetails={setSelectedProduct} />

        <ReviewForm onReviewSubmit={handleReviewSubmit} />
        <PromoForm />

        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={handleCloseModal} />
        )}
      </>
    );
  }

  return (
    <section aria-labelledby="catalog-title">
      <h1 id="catalog-title" className="mb-4 text-2xl font-bold text-ink-900">
        Каталог товарів
      </h1>

      {content}

      <section
        className="mt-10 border-t border-ink-300 pt-6"
        aria-labelledby="makers-title"
      >
        <h2 id="makers-title" className="mb-3 text-xl font-semibold text-ink-900">
          Наші майстри
        </h2>

        {makersStatus === 'loading' && (
          <Loader label="Завантаження майстрів…" />
        )}

        {makersStatus === 'error' && (
          <ErrorMessage
            title="Не вдалося завантажити майстрів"
            message={getErrorMessage(makersError)}
            onRetry={retryMakers}
          />
        )}

        {makersStatus === 'success' && (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {makers.map((maker) => (
              <li
                key={maker.id}
                className="rounded-control border border-ink-300 bg-white p-4"
              >
                <p className="font-semibold text-ink-900">{maker.name}</p>
                <p className="text-sm text-ink-600">
                  {maker.city} · {maker.specialty}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}

export default CatalogPage;