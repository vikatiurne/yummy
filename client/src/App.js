import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './hoc/Layuot/MainLayout';
import { Auth, Basket, Home } from './pages';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAutoLogin } from './pages/Auth/AuthSlice';

function App() {
  const dispatch = useDispatch();
  console.log(useSelector(state=>state.auth.user))

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
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
