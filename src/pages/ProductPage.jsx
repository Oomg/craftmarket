import { Link, useLoaderData } from 'react-router';
import { useCartContext } from '../context/useCartContext';

export default function ProductPage() {
  const { product } = useLoaderData();
  const { addItem } = useCartContext();

  return (
    <article className="mx-auto max-w-2xl">
      <nav className="mb-4 text-sm text-ink-500">
        <Link to="/" className="hover:underline">
          Каталог
        </Link>
        {product.category && (
          <>
            {' / '}
            <span>{product.category}</span>
          </>
        )}
      </nav>

      <h1 className="text-3xl font-bold text-ink-900">{product.name}</h1>
      <p className="mt-1 text-sm uppercase tracking-wide text-ink-500">
        {product.category}
      </p>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="mt-6 aspect-video w-full rounded-control object-cover bg-ink-100"
        />
      )}

      <p className="mt-6 text-3xl font-bold text-brand-700">
        {product.price} грн
      </p>

      <button
        type="button"
        disabled={!product.inStock}
        onClick={() => addItem(product)}
        className="mt-6 rounded-control bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-ink-100 disabled:text-ink-500"
      >
        {product.inStock ? 'До кошика' : 'Немає в наявності'}
      </button>
    </article>
  );
}