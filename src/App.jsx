import { useCartContext } from './context/useCartContext';
import CatalogPage from './pages/CatalogPage';
import CartPage from './components/CartPage/CartPage';
import './App.css';

function App() {
  const { totalCount } = useCartContext();

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
          Кошик: {totalCount}
        </div>
      </header>

      <main style={{ display: 'flex', gap: '32px', padding: '0 24px', flexWrap: 'wrap' }}>
        {/* Каталог */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <CatalogPage />
        </div>

        {/* Панель кошика */}
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <CartPage />
        </div>
      </main>
    </div>
  );
}

export default App;