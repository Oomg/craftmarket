import { useReducer, useMemo, useCallback } from 'react';
import {
  cartReducer,
  initialCartState,
  CART_ACTIONS,
} from './cartReducer';

/**
 * Обчислює кількість безкоштовних одиниць за акцією «2+1» (TRIO)
 * @param {number} quantity
 * @returns {number}
 */
function getFreeUnits(quantity) {
  return Math.floor(quantity / 3);
}

export function useCart() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const addItem = useCallback((product, quantity = 1) => {
    if (product.inStock === false) return;
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity },
    });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id },
    });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, quantity },
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR });
  }, []);

  const applyPromo = useCallback((code) => {
    dispatch({
      type: CART_ACTIONS.APPLY_PROMO,
      payload: { code },
    });
  }, []);

  const removePromo = useCallback(() => {
    dispatch({ type: CART_ACTIONS.REMOVE_PROMO });
  }, []);

  // Похідні значення
  const totals = useMemo(() => {
    const totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

    let totalPrice = 0;

    state.items.forEach((item) => {
      if (state.promoCode === 'TRIO') {
        const free = getFreeUnits(item.quantity);
        const paid = item.quantity - free;
        totalPrice += paid * item.price;
      } else {
        totalPrice += item.quantity * item.price;
      }
    });

    return {
      totalCount,
      totalPrice,
      isEmpty: state.items.length === 0,
    };
  }, [state.items, state.promoCode]);

  return {
    items: state.items,
    promoCode: state.promoCode,
    ...totals,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyPromo,
    removePromo,
    getFreeUnits, // щоб CartItem міг показувати безкоштовні одиниці
  };
}