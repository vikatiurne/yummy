import { useState } from 'react';
import styles from '../App.module.css';
import { v4 as uuidv4 } from 'uuid';

const Categories = ({ categories }) => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <>
      <ul className={styles.sortByButtons}>
        <li
          className={activeItem === null ? styles.active : null}
          onClick={() => setActiveItem(null)}
        >
          Всі
        </li>
        {categories.map((item) => (
          <li
            className={activeItem === item ? styles.active : null}
            key={uuidv4()}
            onClick={() => setActiveItem(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Categories;
