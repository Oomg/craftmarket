import { useState } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';

function ProductList({ products, onOpenDetails }) {
  const [view, setView] = useState('grid');

  if (products.length === 0) {
    return (
      <p className="mt-8 text-center text-ink-500">
        За заданими умовами пошуку товарів не знайдено.
      </p>
    );
  }

  return (
    <div className="mt-4">
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setView('grid')}
          className={`rounded-control px-3 py-1.5 text-sm font-medium transition ${
            view === 'grid'
              ? 'bg-brand-600 text-white'
              : 'border border-ink-300 bg-white text-ink-600 hover:bg-ink-100'
          }`}
        >
          Сітка
        </button>
        <button
          type="button"
          onClick={() => setView('horizontal')}
          className={`rounded-control px-3 py-1.5 text-sm font-medium transition ${
            view === 'horizontal'
              ? 'bg-brand-600 text-white'
              : 'border border-ink-300 bg-white text-ink-600 hover:bg-ink-100'
          }`}
        >
          Список
        </button>
      </div>

      <div
        className={
          view === 'grid'
            ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6'
            : 'flex flex-col gap-3'
        }
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant={view === 'horizontal' ? 'horizontal' : 'grid'}
            onOpenDetails={onOpenDetails}
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
  onOpenDetails: PropTypes.func,
};

export default ProductList;