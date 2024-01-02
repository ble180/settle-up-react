import { CreatePayment } from '@/infraestructure/views/pages/CreatePayment';
import { CreateUser } from '@/infraestructure/views/pages/CreateUser';
import { Home } from '@/infraestructure/views/pages/Home';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/create-user',
    element: <CreateUser />
  },
  {
    path: '/create-payment',
    element: <CreatePayment />
  }
]);

export { router };
