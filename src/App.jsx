import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { QuoteProvider } from '@/app/QuoteContext';

export default function App() {
  return (
    <QuoteProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </QuoteProvider>
  );
}
