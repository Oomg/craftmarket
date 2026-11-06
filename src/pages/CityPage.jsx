import { Link, useParams } from 'react-router';
import { products } from '../mocks/data/products';
import ProductList from '../components/ProductList/ProductList';

// slug → назва міста; товари прив’язуємо через category або окреме поле
// для демо: ceramics → Херсон, textile → Одеса, wood → Львів, candles немає товарів у «Києві»
const CITIES = {
  kherson: { title: 'Херсон', categories: ['Кераміка'] },
  odesa: { title: 'Одеса', categories: ['Текстиль'] },
  lviv: { title: 'Львів', categories: ['Дерево'] },
  kyiv: { title: 'Київ', categories: ['НемаєТакої'] }, // порожній або з свічками
};

export default function CityPage() {
  const { citySlug } = useParams();
  const city = CITIES[citySlug];

  // Міста немає в довіднику → 404 (через NotFound або окремий UI)
  if (!city) {
    return (
      <section className="py-16 text-center">
        <h1 className="text-3xl font-semibold text-ink-900">Місто не знайдено</h1>
        <p className="mt-2 text-ink-600">
          Такого міста немає в каталозі майстрів.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-control bg-brand-600 px-4 py-2 text-white"
        >
          До каталогу
        </Link>
      </section>
    );
  }

  const cityProducts = products.filter((p) =>
    city.categories.includes(p.category)
  );

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-ink-900">
        Товари майстрів: {city.title}
      </h1>

      {cityProducts.length === 0 ? (
        <p className="mt-6 text-ink-600">
          Місто «{city.title}» є в довіднику, але товарів майстрів звідти поки немає.
        </p>
      ) : (
        <ProductList products={cityProducts} />
      )}
    </div>
  );
}