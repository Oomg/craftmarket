import { useCartContext } from './context/useCartContext';
import CatalogPage from './pages/CatalogPage';
import CartPage from './components/CartPage/CartPage';
import BreakpointBadge from './components/dev/BreakpointBadge';

function App() {
  const { totalCount } = useCartContext();

  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      {/* Шапка */}
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
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
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:gap-8 lg:px-8">
        {/* Каталог */}
        <div className="min-w-0 flex-1">
          <CatalogPage />
        </div>

        {/* Панель кошика */}
        <div className="w-full shrink-0 lg:max-w-md">
          <CartPage />
        </div>
      </main>

      {/* Індикатор брейкпоінта (тільки в dev) */}
      {import.meta.env.DEV && <BreakpointBadge />}
    </div>
  );
}

export default App;