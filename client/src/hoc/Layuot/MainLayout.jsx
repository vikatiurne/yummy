import { Outlet } from 'react-router-dom';

import styles from './MainLoyaut.module.css';
import { AdminPanel, Header } from '../../components';
import { useSelector } from 'react-redux';

const MainLayout = () => {
  const role = useSelector((state) => state.auth.user.role);
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
