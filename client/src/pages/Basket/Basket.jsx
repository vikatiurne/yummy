import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TiDelete } from 'react-icons/ti';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

import { deleteProdact, updateOrder } from './BasketSlice';
import emptyBasketLogo from '../../assets/empty_basket.png';
import styles from './Basket.module.css';
import { Link } from 'react-router-dom';

const Basket = () => {
  const [totalPrice, setTotalPrice] = useState('');

  const orders = useSelector((state) => state.basket.order);
  const [emptyBasket, setEmptyBasket] = useState(false);
  console.log(emptyBasket);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders.length) setEmptyBasket(true);
  }, [orders]);

  useEffect(() => {
    const total = orders
      .map((item) => item.num * item.price)
      .reduce((acc, val) => acc + val, 0);
    setTotalPrice(total);
  }, [orders]);

  console.log(orders);

  const subHandler = (id) => {
    dispatch(updateOrder({ prodactId: id, increase: false }));
  };
  const addHandler = (id) => {
    dispatch(updateOrder({ prodactId: id, increase: true }));
  };

  const delHandler = (id) => {
    dispatch(deleteProdact({ prodactId: id }));
  };

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
          onClick={() => subHandler(item.prodactId)}
        />
      </td>

      <td>
        {item.num} {item.unit}
      </td>
      <td>
        <AiFillPlusCircle
          className={styles.update}
          onClick={() => addHandler(item.prodactId)}
        />
      </td>
      <td>{item.price * item.num} грн</td>
      <td>
        <TiDelete
          className={styles.del}
          onClick={() => delHandler(item.prodactId)}
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
      )}
    </>
  );
};

export default Basket;
