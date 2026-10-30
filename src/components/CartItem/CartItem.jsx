import PropTypes from 'prop-types';

function CartItem({ item, freeUnits = 0, onUpdateQuantity, onRemove }) {
  const paidUnits = item.quantity - freeUnits;
  const stock = item.stock ?? Infinity;
  const reachedLimit = item.quantity >= stock;

  return (
    <div className="flex items-center gap-3 rounded-btn border border-line bg-paper p-3">
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="h-14 w-14 shrink-0 rounded-btn object-cover"
        />
      )}

      <div className="min-w-0 flex-1">
        <div className="truncate font-medium text-ink">{item.title}</div>
        <div className="text-sm text-ink-muted">
          {item.price} грн × {item.quantity}
          {freeUnits > 0 && (
            <span className="ml-2 text-clay-600">(безкоштовно: {freeUnits})</span>
          )}
          {reachedLimit && (
            <span className="ml-2 text-red-600">(ліміт: {stock})</span>
          )}
        </div>
        <div className="mt-0.5 font-semibold text-clay-700">
          {paidUnits * item.price} грн
        </div>
      </div>

      {/* Кількість */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-btn border border-line text-ink transition hover:bg-clay-50"
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          disabled={reachedLimit}
          title={reachedLimit ? `На складі лише ${stock} шт.` : undefined}
          className={`flex h-8 w-8 items-center justify-center rounded-btn border border-line transition ${
            reachedLimit
              ? 'cursor-not-allowed bg-line text-ink-muted opacity-60'
              : 'text-ink hover:bg-clay-50'
          }`}
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="rounded-btn bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
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