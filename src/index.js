import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import { Basket, Home } from './pages';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />}>
        <Route index element={<Home />} />
        <Route path="basket" element={<Basket />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
