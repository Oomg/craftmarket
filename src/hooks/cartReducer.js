/**
 * Позиція кошика CraftMarket.
 * @typedef {Object} CartItem
 * @property {string|number} id
 * @property {string} title
 * @property {number} price
 * @property {string} [image]
 * @property {number} quantity
 */

/**
 * @typedef {{ items: CartItem[], promoCode: string | null }} CartState
 */

export const CART_ACTIONS = Object.freeze({
  ADD_ITEM: 'cart/addItem',
  REMOVE_ITEM: 'cart/removeItem',
  UPDATE_QUANTITY: 'cart/updateQuantity',
  CLEAR: 'cart/clear',
  APPLY_PROMO: 'cart/applyPromo',
  REMOVE_PROMO: 'cart/removePromo',
});

/** @type {CartState} */
export const initialCartState = Object.freeze({
  items: [],
  promoCode: null,
});