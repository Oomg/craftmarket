import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <p className={styles.emptyMessage}>
        За заданими умовами пошуку товарів не знайдено.
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          category={product.category}
          inStock={product.inStock}
        />
      ))}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      category: PropTypes.string,
      inStock: PropTypes.bool,
    })
  ).isRequired,
};

export default ProductList;