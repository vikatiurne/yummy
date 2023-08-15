import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaLongArrowAltRight, FaStar } from 'react-icons/fa';

import styles from './ProdactCard.module.css';

const CakeCard = ({ img, name, sizes, price, rating, onclick }) => {
  const [activeSize, setActiveSize] = useState(sizes[0]);

  const renderSizes = sizes.map((size, i) => (
    <li
      key={i}
      className={activeSize === size ? styles.active : null}
      onClick={() => setActiveSize(size)}
    >
      {size}
    </li>
  ));

  return (
    <div className={styles.card}>
      <img src={process.env.REACT_APP_API_URL + img} alt={name} />
      <h3>{name}</h3>
      <ul className={styles.options}>
        {/* <div className={styles.options1}>{renderType}</div> */}
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
        <div className={styles.rating}>
          <p>5</p>
          <FaStar className={styles.star}/>
        </div>
      </div>
    </div>
  );
};

CakeCard.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number,
};
CakeCard.defaultProps = {
  imageUrl: '',
  name: 'Назва торту',
  sizes: [],
  price: 0,
};

export default CakeCard;
