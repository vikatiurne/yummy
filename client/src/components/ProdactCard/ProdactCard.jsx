import { useState } from 'react';
import { FaPlus, FaLongArrowAltRight } from 'react-icons/fa';

import styles from './ProdactCard.module.css';

import { useNavigate } from 'react-router-dom';
import Rating from '../Rating/Rating';

const ProdactCard = ({ img, name, sizes, price, rating, id }) => {
  const [activeSize, setActiveSize] = useState(sizes[0]);

  const navigate = useNavigate();

  const renderSizes = sizes.map((size, i) => (
    <li
      key={i}
      className={activeSize === size ? styles.active : null}
      onClick={() => setActiveSize(size)}
    >
      {size}
    </li>
  ));

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
        <button>
          <FaPlus className={styles.iconPlus} /> Додати <span>20</span>
        </button>
      </div>
      <div className={styles.footerCard}>
        <div className={styles.moreInfo} onClick={redirectHandler}>
          <p>докладніше...</p>
          <FaLongArrowAltRight />
        </div>
        <Rating rating={rating} prodactId={id}/>
        {/* <div className={styles.rating} onClick={toggleRatingHandler}>
          <p>{rate}</p>
          <FaStar className={toggleRating ? styles.activeStar : styles.star} />
        </div> */}
      </div>
    </div>
  );
};

export default ProdactCard;
