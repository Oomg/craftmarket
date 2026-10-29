import PropTypes from 'prop-types';
import { useCartContext } from '../../context/useCartContext';

export default function AddToCartButton({ product }) {
  const { items, addItem } = useCartContext();

  const {
    id,
    inStock = true,
    stock = Infinity,
  } = product;

  const inCart = items.find((item) => item.id === id);
  const currentQty = inCart?.quantity ?? 0;
  const reachedLimit = currentQty >= stock;

  const handleAdd = () => {
    if (!inStock || reachedLimit) return;
    addItem(product);
  };

  let buttonText = 'До кошика';
  if (!inStock) {
    buttonText = 'Немає в наявності';
  } else if (reachedLimit) {
    buttonText = `Ліміт (${stock} шт.)`;
  } else if (inCart) {
    buttonText = `У кошику (${currentQty}) — додати ще`;
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={!inStock || reachedLimit}
      title={reachedLimit ? `На складі лише ${stock} шт.` : undefined}
      style={{
        marginTop: '8px',
        width: '100%',
        padding: '8px',
        backgroundColor: !inStock || reachedLimit ? '#d1d5db' : '#0d9488',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: !inStock || reachedLimit ? 'not-allowed' : 'pointer',
      }}
    >
      {buttonText}
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