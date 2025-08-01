import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router"; 
import { router } from './router/router.jsx';
import 'aos/dist/aos.css';
import AOS from 'aos';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';
import { Query, QueryClient, QueryClientProvider } from '@tanstack/react-query';

AOS.init();

const queryClient= new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-auto'>

<QueryClientProvider client={queryClient}>
<AuthProvider>
      <RouterProvider router={router} />


</AuthProvider>

</QueryClientProvider>
    </div>
  </StrictMode>
)
