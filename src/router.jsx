import { createBrowserRouter } from 'react-router';
import RootLayout from './layouts/RootLayout';
import CatalogPage from './pages/CatalogPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './components/CartPage/CartPage';
import ProductPage from './pages/ProductPage';
import { productLoader } from './pages/productLoader';
import NotFoundPage from './pages/NotFoundPage';
import RouteErrorBoundary from './components/RouteErrorBoundary';
import CityPage from './pages/CityPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        errorElement: <RouteErrorBoundary />,
        children: [
          { index: true, element: <CatalogPage /> },
          { path: 'category/:categorySlug', element: <CategoryPage /> },
          {
            path: 'product/:productId',
            element: <ProductPage />,
            loader: productLoader,
            hydrateFallbackElement: (
              <p role="status" className="py-16 text-center text-ink-500">
                Завантаження товару…
              </p>
            ),
          },
          { path: 'cart', element: <CartPage /> },
          { path: 'city/:citySlug', element: <CityPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);