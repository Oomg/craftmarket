import { useState } from 'react';
import PropTypes from 'prop-types';

const EXIT_MS = 250;

function CartItem({ item, freeUnits = 0, onUpdateQuantity, onRemove }) {
  const [isLeaving, setIsLeaving] = useState(false);
  const paidUnits = item.quantity - freeUnits;
  const stock = item.stock ?? Infinity;
  const reachedLimit = item.quantity >= stock;

  function handleRemove() {
    if (isLeaving) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      onRemove(item.id);
      return;
    }

    setIsLeaving(true);
    setTimeout(() => onRemove(item.id), EXIT_MS);
  }

  return (
    <div
      className={`flex items-center gap-3 overflow-hidden rounded-control border border-ink-300 bg-white p-3 ${
        isLeaving ? 'animate-cart-row-out' : ''
      }`}
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="h-14 w-14 shrink-0 rounded-control object-cover"
        />
      )}

      <div className="min-w-0 flex-1">
        <div className="truncate font-medium text-ink-900">{item.title}</div>
        <div className="text-sm text-ink-500">
          {item.price} грн × {item.quantity}
          {freeUnits > 0 && (
            <span className="ml-2 text-brand-700">(безкоштовно: {freeUnits})</span>
          )}
          {reachedLimit && (
            <span className="ml-2 text-danger-600">(ліміт: {stock})</span>
          )}
        </div>
        <div className="mt-0.5 font-semibold text-brand-700">
          {paidUnits * item.price} грн
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-control border border-ink-300 text-ink-800 transition hover:bg-ink-100"
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          disabled={reachedLimit}
          className={`flex h-8 w-8 items-center justify-center rounded-control border border-ink-300 transition ${
            reachedLimit
              ? 'cursor-not-allowed bg-ink-100 text-ink-500 opacity-60'
              : 'text-ink-800 hover:bg-ink-100'
          }`}
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleRemove}
        disabled={isLeaving}
        className="rounded-control bg-danger-100 px-2.5 py-1.5 text-xs font-medium text-danger-700 transition hover:bg-danger-100/80"
      >
        Видалити
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    quantity: PropTypes.number.isRequired,
    stock: PropTypes.number,
  }).isRequired,
  freeUnits: PropTypes.number,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;