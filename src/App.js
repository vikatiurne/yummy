import { Outlet } from 'react-router-dom';

import { Header } from './components';

import styles from './App.module.css';


function App() {


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
