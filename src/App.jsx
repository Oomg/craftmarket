import CatalogPage from './pages/CatalogPage';
import CartPage from './components/CartPage/CartPage';
import BreakpointBadge from './components/dev/BreakpointBadge';
import CartBadge from './components/CartBadge';

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink-900 font-body">
      <header className="border-b border-ink-300 bg-paper">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <h1 className="font-display text-xl font-bold text-brand-700">
            CraftMarket
          </h1>
          <div className="rounded-full bg-brand-600 px-3.5 py-1.5">
            <CartBadge />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:gap-8 lg:px-8">
        <div className="min-w-0 flex-1">
          <CatalogPage />
        </div>
        <div className="w-full shrink-0 lg:max-w-md">
          <CartPage />
        </div>
      </main>

      {import.meta.env.DEV && <BreakpointBadge />}
    </div>
  );
}

export default App;