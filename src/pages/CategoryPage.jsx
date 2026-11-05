import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList/ProductList';

const CATEGORY_TITLES = {
  ceramics: 'Кераміка',
  textile: 'Текстиль',
  wood: 'Дерево',
};

// slug у URL → значення category у даних (у тебе українською)
const SLUG_TO_CATEGORY = {
  ceramics: 'Кераміка',
  textile: 'Текстиль',
  wood: 'Дерево',
};

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryName = SLUG_TO_CATEGORY[categorySlug];
  const title = CATEGORY_TITLES[categorySlug] || categorySlug;

  useEffect(() => {
    let active = true;
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error(`Статус ${res.status}`);
        const data = await res.json();
        if (active) setProducts(data);
      } catch (e) {
        if (active) setError(e.message);
      } finally {
        if (active) setIsLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [categorySlug]);

  if (!categoryName) {
    return (
      <section className="py-12 text-center">
        <h1 className="text-2xl font-semibold">Категорію не знайдено</h1>
        <Link to="/" className="mt-4 inline-block text-brand-700 underline">
          До каталогу
        </Link>
      </section>
    );
  }

  const filtered = products.filter((p) => p.category === categoryName);

  if (isLoading) {
    return <p className="py-12 text-center text-ink-500">Завантаження…</p>;
  }

  if (error) {
    return (
      <p className="py-12 text-center text-danger-600" role="alert">
        Помилка: {error}
      </p>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-ink-900">{title}</h1>
      {filtered.length === 0 ? (
        <p className="text-ink-500">У цій категорії поки немає товарів.</p>
      ) : (
        <ProductList products={filtered} />
      )}
    </div>
  );
}