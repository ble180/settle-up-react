import { Home } from '@/infraestructure/views/pages/Home';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
]);

export { router };
