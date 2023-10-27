import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TiDelete } from 'react-icons/ti';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

import {
  fetchDecrement,
  fetchGetBasket,
  fetchIncrement,
} from './BasketSlice';

import emptyBasketLogo from '../../assets/empty_basket.png';
import styles from './Basket.module.css';

const Basket = () => {
  const [totalPrice, setTotalPrice] = useState('');

  const orders = useSelector((state) => state.basket.order);
  const [emptyBasket, setEmptyBasket] = useState(false);

  const userId = useSelector((state) => state.auth.user.id);
  const basketStatus = useSelector((state) => state.basket.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!!userId) dispatch(fetchGetBasket({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (orders.length === 0 && basketStatus === 'success') setEmptyBasket(true);
  }, [orders, basketStatus]);

  useEffect(() => {
    const total = orders
      .map(
        (item) =>
          item.basket_prodact.qty * (item.price / parseInt(item.sizes[0]))
      )
      .reduce((acc, val) => acc + val, 0);
    setTotalPrice(total);
  }, [orders]);

  const subHandler = (id, minOrder) => {
    dispatch(fetchDecrement({ prodactId: id, minOrder }));
  };
  const addHandler = (id) => {
    dispatch(fetchIncrement({ prodactId: id }));
  };

  const delHandler = (id) => {
    // dispatch(deleteProdact({ prodactId: id }));
  };
console.log(orders)
  const renderTable = orders.map((item, i) => (
    <tr key={uuidv4()}>
      <td>{i + 1}</td>
      <td>
        <img src={process.env.REACT_APP_API_URL + item.img} alt={item.name} />
      </td>
      <td>{item.name}</td>
      <td>
        <AiFillMinusCircle
          className={styles.update}
          onClick={() =>
            subHandler(item.basket_prodact.prodactId, parseInt(item.sizes[0]))
          }
        />
      </td>

      <td>
        <div className={styles.qtyField}>
          {item.basket_prodact.qty}
          {item.sizes[0].replace(/[^a-zа-яё]/gi, '')}
        </div>
      </td>
      <td>
        <AiFillPlusCircle
          className={styles.update}
          onClick={() => addHandler(item.basket_prodact.prodactId)}
        />
      </td>
      <td>
        {(item.price / parseInt(item.sizes[0])) * item.basket_prodact.qty} грн
      </td>
      <td>
        <TiDelete
          className={styles.del}
          onClick={() => delHandler(item.basket_prodact.prodactId)}
          title="видалити"
        />
      </td>
    </tr>
  ));
  return (
    <>
      {emptyBasket ? (
        <div className={styles.emptyBasket}>
          <img src={emptyBasketLogo} alt="empty basket" />
          <p>Ваш кошик порожній</p>
          <Link to="/">Натисніть сюди, </Link>
          <span>щоб почати покупки</span>
        </div>
      ) : (
        (basketStatus !== 'loading' || basketStatus !== 'idle') && (
          <div className={styles.orderContainer}>
            <table className={styles.table}>
              <thead>{renderTable}</thead>
            </table>
            <div className={styles.total}>
              <p>Сума замовлення</p>
              <p>{totalPrice} грн</p>
            </div>
            <div className={styles.checkout}>
              <Link to="/checkout">
                <button>Оформити замовлення</button>
              </Link>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Basket;
