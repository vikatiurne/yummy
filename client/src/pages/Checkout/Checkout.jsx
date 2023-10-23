import { useState } from 'react';
import { CheckoutForm } from '../../components';
import styles from './Checkout.module.css';

const Checkout = () => {
  const [activeEnterData, setActiveEnterData] = useState(true);
  const [activeLogin, setLogin] = useState(false);

  const enterDataHandler = () => {
    setActiveEnterData(true);
    setLogin(false)
  };

  const loginHandler = ()=>{
    setActiveEnterData(false);
    setLogin(true)
  }

  return (
    <div>
      <h2>Оформлення замовлення</h2>
      <div>
        <main>
          <div className={styles.toggleSwitch}>
            <div onClick={enterDataHandler} className={activeEnterData?styles.active:null}>
              <p>Ввести дані</p>
            </div>
            <div onClick={loginHandler} className={activeLogin?styles.active:null}>
              <p>Увійти в акаунт</p>
            </div>
          </div>
          <CheckoutForm />
        </main>
        <aside></aside>
      </div>
    </div>
  );
};

export default Checkout;
