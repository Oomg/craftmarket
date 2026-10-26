import PropTypes from 'prop-types';
import './product-card.css';

const PLACEHOLDER_IMAGE = '/src/assets/product-placeholder.svg';

function ProductCard({
  name,
  price,
  image,
  category,
  inStock = true,
  onSale = false,
  onAddToCart,
}) {
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

      <button
        type="button"
        onClick={onAddToCart}
        disabled={!inStock}
        style={{
          marginTop: '8px',
          width: '100%',
          padding: '8px',
          backgroundColor: inStock ? '#0d9488' : '#d1d5db',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: inStock ? 'pointer' : 'not-allowed',
        }}
      >
        {inStock ? 'До кошика' : 'Немає в наявності'}
      </button>
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
  onAddToCart: PropTypes.func,
};

export default ProductCard;