import { useCart } from './hooks/useCart';
import CatalogPage from './pages/CatalogPage';
import CartPage from './components/CartPage/CartPage';
import './App.css';

function App() {
  const cart = useCart();

  return (
    <div className="app">
      {/* Шапка з лічильником */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          borderBottom: '1px solid #e5e7eb',
          marginBottom: '16px',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '20px' }}>CraftMarket</h1>
        <div
          aria-live="polite"
          style={{
            backgroundColor: '#0d9488',
            color: 'white',
            padding: '6px 14px',
            borderRadius: '20px',
            fontWeight: 600,
          }}
        >
          Кошик: {cart.totalCount}
        </div>
      </header>

      <main style={{ display: 'flex', gap: '32px', padding: '0 24px', flexWrap: 'wrap' }}>
        {/* Каталог */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <CatalogPage onAddToCart={cart.addItem} />
        </div>

        {/* Панель кошика */}
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <CartPage
            items={cart.items}
            isEmpty={cart.isEmpty}
            totalCount={cart.totalCount}
            totalPrice={cart.totalPrice}
            promoCode={cart.promoCode}
            onUpdateQuantity={cart.updateQuantity}
            onRemove={cart.removeItem}
            onClear={cart.clearCart}
            onApplyPromo={cart.applyPromo}
            onRemovePromo={cart.removePromo}
            getFreeUnits={cart.getFreeUnits}
          />
        </div>
      </main>
    </div>
  );
}

export default App;