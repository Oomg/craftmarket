import { data } from 'react-router';
import { products } from '../mocks/data/products';

export async function productLoader({ params }) {
  const product = products.find(
    (p) => String(p.id) === String(params.productId)
  );

  if (!product) {
    throw data('Товар не знайдено', { status: 404 });
  }

  await new Promise((r) => setTimeout(r, 150));

  return { product };
}