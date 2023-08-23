import { useState } from 'react';
import { FaPlus, FaLongArrowAltRight, FaStar } from 'react-icons/fa';

import styles from './ProdactCard.module.css';

const CakeCard = ({ img, name, sizes, price, rating, onclick }) => {
  const [activeSize, setActiveSize] = useState(sizes[0]);

  const [ratingTest, setRatingTest] = useState(0);
  const [toggleRating, setToggleRating] = useState(false);

  const renderSizes = sizes.map((size, i) => (
    <li
      key={i}
      className={activeSize === size ? styles.active : null}
      onClick={() => setActiveSize(size)}
    >
      {size}
    </li>
  ));

  const addRatingHandler = () => {
    !toggleRating
      ? setRatingTest((prev) => prev + 1)
      : setRatingTest((prev) => prev - 1);
    setToggleRating((prev) => !prev);
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
        <div className={styles.moreInfo} onClick={onclick}>
          <p>докладніше...</p>
          <FaLongArrowAltRight />
        </div>
        <div className={styles.rating} onClick={addRatingHandler}>
          <p>{ratingTest}</p>
          <FaStar className={toggleRating ? styles.activeStar : styles.star} />
        </div>
      </div>
    </div>
  );
};

export default CakeCard;
