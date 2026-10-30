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
      <div className="rounded-card border border-line bg-paper p-6 text-center text-ink-muted shadow-card">
        Кошик порожній
      </div>
    );
  }

  return (
    <div className="rounded-card border border-line bg-paper p-4 shadow-card">
      <h2 className="mb-4 font-display text-lg font-semibold text-ink">
        Кошик ({totalCount} шт.)
      </h2>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            freeUnits={promoCode === 'TRIO' ? getFreeUnits(item.quantity) : 0}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>

      {/* Промокод TRIO */}
      <div className="mt-4 flex items-center gap-2">
        {promoCode ? (
          <>
            <span className="text-sm font-medium text-clay-700">
              Промокод: {promoCode}
            </span>
            <button
              type="button"
              onClick={removePromo}
              className="rounded-btn bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 transition hover:bg-red-100"
            >
              Скасувати
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => applyPromo('TRIO')}
            className="rounded-btn bg-clay-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-clay-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-600"
          >
            Застосувати TRIO (2+1)
          </button>
        )}
      </div>

      {/* Підсумок */}
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <strong className="text-ink">Разом: {totalPrice} грн</strong>
        <button
          type="button"
          onClick={clearCart}
          className="rounded-btn border border-line bg-paper px-3 py-1.5 text-sm text-ink-muted transition hover:bg-clay-50"
        >
          Очистити кошик
        </button>
      </div>
    </div>
  );
}

export default CartPage;