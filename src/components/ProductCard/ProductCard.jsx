import PropTypes from 'prop-types';
import AddToCartButton from './AddToCartButton';

const PLACEHOLDER_IMAGE = '/src/assets/product-placeholder.svg';

function ProductCard({ product, variant = 'grid', onOpenDetails }) {
  const { name, price, image, category, inStock = true, onSale = false } = product;
  const imageSrc = image || PLACEHOLDER_IMAGE;
  const isHorizontal = variant === 'horizontal';

  if (isHorizontal) {
    return (
      <article className="group flex w-full overflow-hidden rounded-card border border-ink-300 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden bg-ink-100 sm:h-32 sm:w-32">
          <img
            src={imageSrc}
            alt={name}
            width="400"
            height="300"
            className={`h-full w-full object-cover transition duration-300 ${
              inStock ? 'group-hover:scale-105' : 'grayscale'
            }`}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 p-3">
          <div>
            <p className="truncate text-xs font-medium uppercase tracking-wide text-ink-500">
              {category || 'Без категорії'}
            </p>
            <h3 className="line-clamp-2 text-sm font-semibold text-ink-900 sm:text-base">
              {name}
            </h3>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-base font-bold text-brand-700">{price} грн</p>
            <div className="w-36 shrink-0">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-card border border-ink-300 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
        <img
          src={imageSrc}
          alt={name}
          width="400"
          height="300"
          className={`h-full w-full object-cover transition duration-300 ${
            inStock ? 'group-hover:scale-105' : 'grayscale'
          }`}
        />
        {!inStock && (
          <span className="absolute left-2 top-2 rounded-control bg-ink-900/80 px-2 py-0.5 text-xs font-medium text-white">
            Немає в наявності
          </span>
        )}
        {category === 'Кераміка' && onSale && inStock && (
          <span className="absolute left-2 top-2 rounded-control bg-brand-600 px-2 py-0.5 text-xs font-medium text-white">
            Розпродаж
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
        <p className="truncate text-xs font-medium uppercase tracking-wide text-ink-500">
          {category}
        </p>
        <h3 className="line-clamp-2 text-base font-semibold text-ink-900 md:text-lg">
          {name}
        </h3>
        <p className="mt-auto pt-2 text-lg font-bold text-brand-700">{price} грн</p>

        <div className="mt-2 flex flex-col gap-2">
          {onOpenDetails && (
            <button
              type="button"
              onClick={() => onOpenDetails(product)}
              className="w-full rounded-control border border-ink-300 px-3 py-2 text-sm font-medium text-ink-800 transition duration-150 hover:bg-ink-100 active:scale-95"
            >
              Деталі
            </button>
          )}
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    category: PropTypes.string,
    inStock: PropTypes.bool,
    stock: PropTypes.number,
    onSale: PropTypes.bool,
  }).isRequired,
  variant: PropTypes.oneOf(['grid', 'horizontal']),
  onOpenDetails: PropTypes.func,
};

export default ProductCard;