import PropTypes from 'prop-types';
import AddToCartButton from './AddToCartButton';

const PLACEHOLDER_IMAGE = '/src/assets/product-placeholder.svg';

function ProductCard({ product, variant = 'grid' }) {
  const { name, price, image, category, inStock = true, onSale = false } = product;
  const imageSrc = image || PLACEHOLDER_IMAGE;
  const isHorizontal = variant === 'horizontal';

  if (isHorizontal) {
    return (
      <article className="group flex overflow-hidden rounded-card border border-line bg-paper shadow-card transition hover:shadow-card-hover">
        {/* Зображення ліворуч */}
        <div className="relative h-28 w-28 shrink-0 overflow-hidden bg-clay-50 sm:h-32 sm:w-32">
          <img
            src={imageSrc}
            alt={name}
            className={`h-full w-full object-cover transition duration-300 ${
              inStock ? 'group-hover:scale-105' : 'grayscale'
            }`}
          />
          {!inStock && (
            <span className="absolute left-1 top-1 rounded bg-ink/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
              Немає
            </span>
          )}
        </div>

        {/* Текст праворуч */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 p-3">
          <div>
            <p className="truncate text-xs font-medium uppercase tracking-wide text-ink-muted">
              {category || 'Без категорії'}
            </p>
            <h3 className="line-clamp-2 font-display text-sm font-semibold text-ink sm:text-base">
              {name}
            </h3>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-base font-bold text-clay-700">{price} грн</p>
            <div className="w-36 shrink-0">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Звичайна (сітка) картка
  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-line bg-paper shadow-card transition hover:shadow-card-hover">
      <div className="relative aspect-[4/3] overflow-hidden bg-clay-50">
        <img
          src={imageSrc}
          alt={name}
          className={`h-full w-full object-cover transition duration-300 ${
            inStock ? 'group-hover:scale-105' : 'grayscale'
          }`}
        />
        {!inStock && (
          <span className="absolute left-2 top-2 rounded-btn bg-ink/80 px-2 py-0.5 text-xs font-medium text-white">
            Немає в наявності
          </span>
        )}
        {category === 'Кераміка' && onSale && inStock && (
          <span className="absolute left-2 top-2 rounded-btn bg-clay-600 px-2 py-0.5 text-xs font-medium text-white">
            Розпродаж
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="truncate text-xs font-medium uppercase tracking-wide text-ink-muted">
          {category}
        </p>
        <h3 className="line-clamp-2 font-display text-base font-semibold text-ink">
          {name}
        </h3>
        <p className="mt-auto pt-1 text-lg font-bold text-clay-700">{price} грн</p>
        <div className="mt-2">
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
};

export default ProductCard;