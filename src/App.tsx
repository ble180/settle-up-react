import { Navbar } from '@/infraestructure/views/components/Navbar';
import { router } from '@/infraestructure/views/router/index';
import { RouterProvider } from 'react-router-dom';
import {
  GroupContext,
  group
} from '@/infraestructure/views/providers/GroupContextProvider';

function App() {
  return (
    <GroupContext.Provider value={group}>
      <Navbar />
      <main className="main">
        <RouterProvider router={router} />
      </main>
    </GroupContext.Provider>
  );
}

export default App;
