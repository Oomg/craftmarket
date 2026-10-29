import { useCartContext } from '../../context/useCartContext';
import CartItem from '../CartItem/CartItem';

function CartPage() {
  const {
    items,
    isEmpty,
    totalCount,
    totalPrice,
    promoCode,
    updateQuantity,
    removeItem,
    clearCart,
    applyPromo,
    removePromo,
    getFreeUnits,
  } = useCartContext();

  if (isEmpty) {
    return (
      <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
        Кошик порожній
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        marginTop: '24px',
        maxWidth: '500px',
      }}
    >
      <h2 style={{ marginTop: 0 }}>Кошик ({totalCount} шт.)</h2>

      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          freeUnits={promoCode === 'TRIO' ? getFreeUnits(item.quantity) : 0}
          onUpdateQuantity={updateQuantity}
          onRemove={removeItem}
        />
      ))}

      {/* Промокод TRIO */}
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        {promoCode ? (
          <>
            <span style={{ color: '#059669' }}>Промокод: {promoCode}</span>
            <button
              type="button"
              onClick={removePromo}
              style={{
                padding: '4px 10px',
                fontSize: '13px',
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Скасувати
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => applyPromo('TRIO')}
            style={{
              padding: '8px 14px',
              backgroundColor: '#0d9488',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Застосувати TRIO (2+1)
          </button>
        )}
      </div>

      <div
        style={{
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <strong>Разом: {totalPrice} грн</strong>
        <button
          type="button"
          onClick={clearCart}
          style={{
            padding: '8px 14px',
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Очистити кошик
        </button>
      </div>
    </div>
  );
}

export default CartPage;