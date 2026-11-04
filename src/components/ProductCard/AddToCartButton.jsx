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
  if (!product.inStock) label = 'Немає в наявності';
  else if (reachedLimit) label = `Ліміт (${stock} шт.)`;
  else if (inCart) label = `У кошику (${currentQty}) — додати ще`;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => addItem(product)}
      className={
        disabled
          ? 'w-full cursor-not-allowed rounded-control bg-ink-100 px-3 py-2 text-sm font-semibold text-ink-500'
          : 'w-full rounded-control bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600'
      }
    >
      {label}
    </button>
  );
}

AddToCartButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    inStock: PropTypes.bool,
    stock: PropTypes.number,
  }).isRequired,
};

export default AddToCartButton;