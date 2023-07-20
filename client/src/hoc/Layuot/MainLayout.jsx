import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './MainLoyaut.module.css';
import { Header, AdminPanel } from '../../components';
import { useSelector } from 'react-redux';

const MainLayout = () => {
  const role = useSelector((state) => state.auth.user.role);
  const status = useSelector((state) => state.auth.status);
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header />
        {role === 'ADMIN' ? <AdminPanel /> : null}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
