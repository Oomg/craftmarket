import PropTypes from 'prop-types';
import './product-card.css';

const PLACEHOLDER_IMAGE = '/src/assets/product-placeholder.svg';

/**
 * @param {Object} props
 * @param {string} props.name - Назва товару
 * @param {number} props.price - Ціна товару
 * @param {string} [props.image] - Шлях до зображення (необов’язковий)
 * @param {string} props.category - Категорія товару
 * @param {boolean} [props.inStock=true] - Чи є товар у наявності
 * @param {boolean} [props.onSale=false] - Чи є товар на розпродажі
 */
function ProductCard({ name, price, image, category, inStock = true, onSale = false }) {
  const imageSrc = image || PLACEHOLDER_IMAGE;

  return (
    <article className="product-card">
      <img
        className="product-card__image"
        src={imageSrc}
        alt={name}
      />
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
    </article>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  category: PropTypes.string.isRequired,
  inStock: PropTypes.bool,
  onSale: PropTypes.bool,
};

export default ProductCard;