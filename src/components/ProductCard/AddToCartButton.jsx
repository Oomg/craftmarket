import PropTypes from 'prop-types';
import { useCartContext } from '../../context/useCartContext';

function AddToCartButton({ product }) {
  const { items, addItem } = useCartContext();

  const inCart = items.find((item) => item.id === product.id);
  const currentQty = inCart?.quantity ?? 0;
  const stock = product.stock ?? Infinity;
  const reachedLimit = currentQty >= stock;
  const disabled = !product.inStock || reachedLimit;

  let label = 'До кошика';
  if (!product.inStock) {
    label = 'Немає в наявності';
  } else if (reachedLimit) {
    label = `Ліміт (${stock} шт.)`;
  } else if (inCart) {
    label = `У кошику (${currentQty}) — додати ще`;
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => addItem(product)}
      title={reachedLimit ? `На складі лише ${stock} шт.` : undefined}
      className={[
        'w-full rounded-btn px-3 py-2 text-sm font-semibold transition',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-600',
        disabled
          ? 'cursor-not-allowed bg-line text-ink-muted'
          : 'bg-clay-600 text-white hover:bg-clay-700 active:bg-clay-800',
      ].join(' ')}
    >
      {label}
    </button>
  );
}

AddToCartButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    inStock: PropTypes.bool,
    stock: PropTypes.number,
  }).isRequired,
};

export default AddToCartButton;