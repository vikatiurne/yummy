import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './hoc/Layuot/MainLayout';
import { Auth, Basket, Home } from './pages';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAutoLogin } from './pages/Auth/AuthSlice';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!!token) dispatch(fetchAutoLogin(token));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="basket" element={<Basket />} />
          {!isAuth && <Route path="auth" element={<Auth />} />}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
