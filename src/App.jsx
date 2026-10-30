import { useCartContext } from './context/useCartContext';
import CatalogPage from './pages/CatalogPage';
import CartPage from './components/CartPage/CartPage';

function App() {
  const { totalCount } = useCartContext();

  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      {/* Шапка */}
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="font-display text-xl font-bold text-clay-700">
            CraftMarket
          </h1>
          <div
            aria-live="polite"
            className="rounded-full bg-clay-600 px-3.5 py-1.5 text-sm font-semibold text-white"
          >
            Кошик: {totalCount}
          </div>
        </div>
      </header>

      {/* Основний вміст */}
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6 lg:flex-row">
        {/* Каталог */}
        <div className="min-w-0 flex-1">
          <CatalogPage />
        </div>

        {/* Панель кошика */}
        <div className="w-full max-w-md shrink-0">
          <CartPage />
        </div>
      </main>
    </div>
  );
}

export default App;