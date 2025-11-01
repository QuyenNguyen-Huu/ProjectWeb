import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter } from 'react-router-dom';

// 2. Import CartProvider (đảm bảo đúng đường dẫn)
import { CartProvider } from './context/cartContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>

  </StrictMode>,
)
