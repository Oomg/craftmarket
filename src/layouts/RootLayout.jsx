import { NavLink, Outlet, useNavigation } from 'react-router';
import { useCartContext } from '../context/useCartContext';

const CATEGORY_LINKS = [
  { slug: 'ceramics', title: 'Кераміка' },
  { slug: 'textile', title: 'Текстиль' },
  { slug: 'wood', title: 'Дерево' },
];

const CITY_LINKS = [
  { slug: 'kherson', title: 'Херсон' },
  { slug: 'odesa', title: 'Одеса' },
  { slug: 'lviv', title: 'Львів' },
  { slug: 'kyiv', title: 'Київ' },
];

const navLinkClass = ({ isActive }) => {
  const base = 'rounded-control px-3 py-2 text-sm font-medium transition-colors';
  return isActive
    ? `${base} bg-brand-100 text-brand-800`
    : `${base} text-ink-700 hover:bg-ink-100`;
};

export default function RootLayout() {
  const { totalCount } = useCartContext();
  const navigation = useNavigation();
  const isNavigating = navigation.state === 'loading';

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink-900">
      <header className="border-b border-ink-300 bg-white">
        <nav
          aria-label="Головна навігація"
          className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3"
        >
          <NavLink to="/" end className={navLinkClass}>
            Каталог
          </NavLink>
          {CATEGORY_LINKS.map(({ slug, title }) => (
            <NavLink key={slug} to={`/category/${slug}`} className={navLinkClass}>
              {title}
            </NavLink>
          ))}
          {CITY_LINKS.map(({ slug, title }) => (
            <NavLink key={slug} to={`/city/${slug}`} className={navLinkClass}>
              {title}
            </NavLink>
          ))}
          <NavLink to="/cart" className={(state) => `${navLinkClass(state)} ml-auto`}>
            Кошик ({totalCount})
          </NavLink>
        </nav>
        {isNavigating && (
          <div
            role="progressbar"
            aria-label="Завантаження сторінки"
            className="h-1 w-full animate-pulse bg-brand-600"
          />
        )}
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t border-ink-300 py-4 text-center text-sm text-ink-500">
        CraftMarket · вітрина виробів ручної роботи
      </footer>
    </div>
  );
}