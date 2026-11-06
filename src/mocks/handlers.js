import { http, HttpResponse, delay } from 'msw';
import { products } from './data/products';
import { makers } from './data/makers';

export const mockControl = {
  delayMs: 800,
  failuresLeft: 0,
  failureMode: 'http', // 'http' | 'network'
};

export const handlers = [
  http.get('/api/products', async () => {
    await delay(mockControl.delayMs);

    if (mockControl.failuresLeft > 0) {
      mockControl.failuresLeft -= 1;
      if (mockControl.failureMode === 'network') {
        return HttpResponse.error();
      }
      return HttpResponse.json(
        { message: 'Внутрішня помилка мок-сервера' },
        { status: 500 },
      );
    }

    return HttpResponse.json(products);
  }),

  http.get('/api/makers', async () => {
    await delay(mockControl.delayMs);
    return HttpResponse.json(makers);
  }),
];