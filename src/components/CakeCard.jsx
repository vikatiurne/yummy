import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';

import styles from '../App.module.css';

const CakeCard = ({ imageUrl, name, types, sizes, price }) => {
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);

  const typeName = ['з прикрасами', 'без прикрас'];
  const renderType = typeName.map((type, i) => (
    <li
      key={i}
      className={`${activeType === i ? styles.active : ''} ${
        !types.includes(i) ? styles.disable : ''
      }`}
      onClick={() => setActiveType(i)}
    >
      {type}
    </li>
  ));

  const renderSizes = sizes.map((size, i) => (
    <li
      key={i}
      className={activeSize === size ? styles.active : null}
      onClick={() => setActiveSize(size)}
    >
      {size}кг
    </li>
  ));

  return (
    <div className={styles.card}>
      <img src={require('../assets/' + imageUrl)} alt={name} />
      <h3>{name}</h3>
      <ul className={styles.options}>
        <div className={styles.options1}>{renderType}</div>
        <div className={styles.options2}>{renderSizes}</div>
      </ul>
      <div className={styles.priceInfo}>
        <p>від {price}₴</p>
        <button>
          <FaPlus className={styles.iconPlus} /> Додати <span>20</span>
        </button>
      </div>
    </div>
  );
};

CakeCard.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.number).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  price: PropTypes.number,
};
CakeCard.defaultProps = {
  imageUrl: '',
  name: 'Назва торту',
  types: [],
  sizes: [],
  price: 0,
};

export default CakeCard;
