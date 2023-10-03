import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaPlus, FaLongArrowAltRight } from 'react-icons/fa';

import Rating from '../Rating/Rating';

import styles from './ProdactCard.module.css';
import { formOrder } from '../../pages/Basket/BasketSlice.js';

const ProdactCard = ({ img, name, sizes, price, rating, id }) => {
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [qtyProdact, setQtyProdact] = useState(parseInt(sizes[0]));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderSizes = sizes.map((size, i) => (
    <li
      key={i}
      className={activeSize === size ? styles.active : null}
      onClick={() => clickSizeHandler(size)}
    >
      {size}
    </li>
  ));

  const clickSizeHandler = (size) => {
    setActiveSize(size);
    setQtyProdact(parseInt(size));
  };

  const addHandler = () => {
    const priceForOne = price / parseInt(sizes[0]);
    let unit;
    if (activeSize) unit = activeSize.replace(/[^a-zа-яё]/gi, '');
    const minOrder = +sizes[0].replace(/[^\d]/g, '');
    dispatch(
      formOrder({
        img,
        name,
        price: priceForOne,
        prodactId: id,
        num: qtyProdact,
        unit,
        minOrder,
      })
    );
    setQtyProdact(0);
    setActiveSize(null);
  };

  const redirectHandler = () => {
    navigate('/prodact/' + id);
  };

  return (
    <div className={styles.card}>
      <img src={process.env.REACT_APP_API_URL + img} alt={name} />
      <h3>{name}</h3>
      <ul className={styles.options}>
        <div className={styles.options2}>{renderSizes}</div>
      </ul>
      <div className={styles.priceInfo}>
        <p>від {price}₴</p>
        <button onClick={addHandler}>
          <FaPlus className={styles.iconPlus} /> Додати{' '}
          <span>{qtyProdact}</span>
        </button>
      </div>
      <div className={styles.footerCard}>
        <div className={styles.moreInfo} onClick={redirectHandler}>
          <p>докладніше...</p>
          <FaLongArrowAltRight />
        </div>
        <Rating rating={rating} prodactId={id} />
      </div>
    </div>
  );
};

export default ProdactCard;
