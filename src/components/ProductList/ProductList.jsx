import { useState } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';

function ProductList({ products }) {
  const [view, setView] = useState('grid'); // 'grid' | 'horizontal'

  if (products.length === 0) {
    return (
      <p className="mt-8 text-center text-ink-muted">
        За заданими умовами пошуку товарів не знайдено.
      </p>
    );
  }

  return (
    <div className="mt-4">
      {/* Перемикач вигляду */}
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setView('grid')}
          className={`rounded-btn px-3 py-1.5 text-sm font-medium transition ${
            view === 'grid'
              ? 'bg-clay-600 text-white'
              : 'border border-line bg-paper text-ink-muted hover:bg-clay-50'
          }`}
        >
          Сітка
        </button>
        <button
          type="button"
          onClick={() => setView('horizontal')}
          className={`rounded-btn px-3 py-1.5 text-sm font-medium transition ${
            view === 'horizontal'
              ? 'bg-clay-600 text-white'
              : 'border border-line bg-paper text-ink-muted hover:bg-clay-50'
          }`}
        >
          Список
        </button>
      </div>

      {/* Список карток */}
      <div
        className={
          view === 'grid'
            ? 'grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4'
            : 'flex flex-col gap-3'
        }
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant={view === 'horizontal' ? 'horizontal' : 'grid'}
          />
        ))}
      </div>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      category: PropTypes.string,
      inStock: PropTypes.bool,
      stock: PropTypes.number,
    })
  ).isRequired,
};

export default ProductList;