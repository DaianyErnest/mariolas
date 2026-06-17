import { createHashRouter } from 'react-router';

export const router = createHashRouter([
  {
    path: '/',
    HydrateFallback: () => null,
    lazy: async () => {
      const { HomePage } = await import('./pages/HomePage');
      return { Component: HomePage };
    },
  },
  {
    path: '/checkout',
    HydrateFallback: () => null,
    lazy: async () => {
      const { CheckoutPage } = await import('./pages/CheckoutPage');
      return { Component: CheckoutPage };
    },
  },
]);
