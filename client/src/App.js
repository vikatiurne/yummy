import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from './hoc/Layuot/MainLayout';
import { Admin, Auth, Basket, Home, Prodact } from './pages';
import { useDispatch } from 'react-redux';
import { fetchAutoLogin } from './pages/Auth/AuthSlice';
import { useEffect } from 'react';
import { ForgotPassword, Login, Registration } from './components';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!!token) dispatch(fetchAutoLogin(token));
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="basket" element={<Basket />} />
          <Route path="prodact/:id" element={<Prodact />} />
          <Route path="auth" element={<Auth />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
