import PropTypes from 'prop-types';
import AddToCartButton from './AddToCartButton';
import './product-card.css';

const PLACEHOLDER_IMAGE = '/src/assets/product-placeholder.svg';

function ProductCard({ product }) {
  const { name, price, image, category, inStock = true, onSale = false } = product;
  const imageSrc = image || PLACEHOLDER_IMAGE;

  return (
    <article className="product-card">
      <img className="product-card__image" src={imageSrc} alt={name} />
      <h3>{name}</h3>
      <p className="product-card__price">{price} грн</p>
      <p className="product-card__category">{category}</p>

      {!inStock && (
        <span className="product-card__badge product-card__badge--out">
          Немає в наявності
        </span>
      )}

      {category === 'Кераміка' && onSale && (
        <span className="product-card__badge product-card__badge--sale">
          Розпродаж
        </span>
      )}

      {/* Використовуємо ізольовану кнопку */}
      <AddToCartButton product={product} />
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    category: PropTypes.string,
    inStock: PropTypes.bool,
    onSale: PropTypes.bool,
  }).isRequired,
};

export default ProductCard;