import PropTypes from 'prop-types';

function CartItem({ item, freeUnits = 0, onUpdateQuantity, onRemove }) {
  const paidUnits = item.quantity - freeUnits;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        marginBottom: '8px',
      }}
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
        />
      )}

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{item.title}</div>
        <div style={{ color: '#6b7280', fontSize: '14px' }}>
          {item.price} грн × {item.quantity}
          {freeUnits > 0 && (
            <span style={{ color: '#059669', marginLeft: '8px' }}>
              (безкоштовно: {freeUnits})
            </span>
          )}
        </div>
        <div style={{ fontWeight: 500, marginTop: '4px' }}>
          {paidUnits * item.price} грн
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #d1d5db', cursor: 'pointer' }}
        >
          −
        </button>
        <span style={{ minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #d1d5db', cursor: 'pointer' }}
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => onRemove(item.id)}
        style={{
          padding: '6px 12px',
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
        }}
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
  }).isRequired,
  freeUnits: PropTypes.number,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;