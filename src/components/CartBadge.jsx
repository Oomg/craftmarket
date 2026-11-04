import { useCartContext } from '../context/useCartContext';

export default function CartBadge() {
  const { totalCount } = useCartContext();

  return (
    <span className="relative inline-flex items-center">
      <span className="text-sm font-semibold text-white">Кошик</span>

      {totalCount > 0 && (
        <span
          key={totalCount}
          aria-hidden="true"
          className="ml-2 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1.5 text-xs font-bold text-brand-700 animate-badge-pop"
        >
          {totalCount}
        </span>
      )}

      <span role="status" className="sr-only">
        Кошик, товарів: {totalCount}
      </span>
    </span>
  );
}