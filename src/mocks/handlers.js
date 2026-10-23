import { http, HttpResponse, delay } from "msw";
import { products } from "./data/products";

export const handlers = [
  http.get("/api/products", async () => {
    // Варіант 10 (ЛР5): випадкова затримка 300–1200 мс
    const randomDelay = Math.floor(Math.random() * (1200 - 300 + 1)) + 300;
    await delay(randomDelay);

    return HttpResponse.json(products);
  }),
];