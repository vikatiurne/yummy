import { useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './Categories.module.css';
import axios from 'axios';

const Categories = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/category')
      .then((res) => setCategories(res.data));
  }, []);

  
  
  return (
    <>
      <ul className={styles.sortByButtons}>
        <li
          className={activeItem === null ? styles.active : null}
          onClick={() => setActiveItem(null)}
        >
          Всі
        </li>
        {categories.map(item => (
          <li
            className={activeItem === item.name ? styles.active : null}
            key={uuidv4()}
            onClick={() => setActiveItem(item.name)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Categories;
