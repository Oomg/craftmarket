import { createContext } from 'react';

/**
 * @typedef {Object} CartItem
 * @property {string|number} id
 * @property {string} title
 * @property {number} price
 * @property {string} [image]
 * @property {number} quantity
 * @property {number} [stock]
 */

/**
 * @typedef {Object} CartContextValue
 * @property {CartItem[]} items
 * @property {string|null} promoCode
 * @property {number} totalCount
 * @property {number} totalPrice
 * @property {boolean} isEmpty
 * @property {(product: object, quantity?: number) => void} addItem
 * @property {(id: string|number) => void} removeItem
 * @property {(id: string|number, quantity: number) => void} updateQuantity
 * @property {() => void} clearCart
 * @property {(code: string) => void} applyPromo
 * @property {() => void} removePromo
 * @property {(quantity: number) => number} getFreeUnits
 */

/** @type {import('react').Context<CartContextValue | null>} */
export const CartContext = createContext(null);

CartContext.displayName = 'CartContext';