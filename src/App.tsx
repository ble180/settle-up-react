import { Navbar } from '@/infraestructure/views/components/Navbar';
import { router } from '@/infraestructure/views/router/index';
import { RouterProvider } from 'react-router-dom';
import { DIProvider } from './infraestructure/views/providers/DIProvider';

function App() {
  return (
    <DIProvider>
      <Navbar />
      <main className="main">
        <RouterProvider router={router} />
      </main>
    </DIProvider>
  );
}

export default App;
