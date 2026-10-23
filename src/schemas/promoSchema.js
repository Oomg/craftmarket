import { z } from 'zod';

// Список «протермінованих» кодів
const expiredCodes = ['OLD2024', 'SUMMER23', 'WINTER22'];

export const promoSchema = z.object({
  promoCode: z
    .string()
    .trim()
    .min(1, 'Введіть промокод')
    .regex(
      /^[A-Z0-9]{6,10}$/,
      'Промокод має містити лише великі латинські літери та цифри (6–10 символів)'
    )
    .refine(
      (code) => !expiredCodes.includes(code),
      'Цей промокод протермінований'
    ),
});