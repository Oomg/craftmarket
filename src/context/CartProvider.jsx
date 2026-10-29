import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from './CartContext';
import { useCart } from '../hooks/useCart';

export function CartProvider({ children }) {
  const cart = useCart();

  const value = useMemo(
    () => ({
      items: cart.items,
      promoCode: cart.promoCode,
      totalCount: cart.totalCount,
      totalPrice: cart.totalPrice,
      isEmpty: cart.isEmpty,
      addItem: cart.addItem,
      removeItem: cart.removeItem,
      updateQuantity: cart.updateQuantity,
      clearCart: cart.clearCart,
      applyPromo: cart.applyPromo,
      removePromo: cart.removePromo,
      getFreeUnits: cart.getFreeUnits,
    }),
    [
      cart.items,
      cart.promoCode,
      cart.totalCount,
      cart.totalPrice,
      cart.isEmpty,
      cart.addItem,
      cart.removeItem,
      cart.updateQuantity,
      cart.clearCart,
      cart.applyPromo,
      cart.removePromo,
      cart.getFreeUnits,
    ],
  );

  return <CartContext value={value}>{children}</CartContext>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};