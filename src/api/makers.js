import { z } from 'zod';
import { ApiError } from './products';

const makerSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  city: z.string().min(1),
  specialty: z.string().min(1),
});

const makersSchema = z.array(makerSchema);

export class SchemaError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SchemaError';
  }
}

export async function fetchMakers({ signal } = {}) {
  const response = await fetch('/api/makers', { signal });
  if (!response.ok) {
    throw new ApiError(
      `Запит завершився зі статусом ${response.status}`,
      response.status,
    );
  }
  const json = await response.json();
  const parsed = makersSchema.safeParse(json);
  if (!parsed.success) {
    throw new SchemaError(
      'Сервер повернув дані у неочікуваному форматі. Спробуйте пізніше.',
    );
  }
  return parsed.data;
}