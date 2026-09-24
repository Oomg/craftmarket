import ProductCard from './components/ProductCard/ProductCard';

const products = [
  {
    id: 1,
    name: 'Ваза керамічна',
    price: 450,
    category: 'Кераміка',
    image: '/src/assets/vase.jpg',
    onSale: true,
  },
  {
    id: 2,
    name: 'Дерев\'яна миска',
    price: 320,
    category: 'Дерев\'яні вироби',
  },
  {
    id: 3,
    name: 'Кулон срібний',
    price: 780,
    category: 'Прикраси',
    image: '/src/assets/pendant.jpg',
    inStock: false,
  },
];

function App() {
  return (
    <main className="catalog-preview">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </main>
  );
}

export default App;