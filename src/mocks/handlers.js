import { http, HttpResponse, delay } from "msw";
import { products } from "./data/products";

export const handlers = [
  http.get("/api/products", async () => {
    const randomDelay = Math.floor(Math.random() * (1200 - 300 + 1)) + 300;
    await delay(randomDelay);

    // Тимчасово — помилка 500
    return HttpResponse.json(
      { message: "Внутрішня помилка сервера" },
      { status: 500 }
    );
  }),
];