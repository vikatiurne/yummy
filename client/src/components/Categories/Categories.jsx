import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BsTriangleFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

import styles from './Categories.module.css';
import SortBy from '../SortBy/SortBy';

const Categories = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [visibleSubcategoryList, setVisibleSubcategoryList] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Вся випічка');
  const [subcategory, setSubcategory] = useState('');
  const [categoryId, setCategoryId] = useState(null);

  const categories = useSelector((state) => state.home.category);
  const subcategories = useSelector((state) => state.home.subcategory);

  const clickCategoryHandler = (name, id) => {
    setActiveItem(name);
    setSelectedSort(name);
    setSubcategory('');
    setCategoryId(id);
  };

  const clickSubcategoryHandler = (name) => {
    setSubcategory(name);
    setVisibleSubcategoryList(false);
  };

  const rendersubcategory = (
    <ul className={styles.select}>
      {subcategories
        .filter((item) => item.categoryId === categoryId)
        .map((item) => (
          <li key={uuidv4()} onClick={() => clickSubcategoryHandler(item)}>
            {item.name}
          </li>
        ))}
    </ul>
  );

  const renderCategory = categories.map((item) => (
    <div key={uuidv4()}>
      <li
        className={activeItem === item.name ? styles.active : null}
        onClick={() => clickCategoryHandler(item.name, item.id)}
      >
        {item.name}
        {activeItem === item.name && (
          <BsTriangleFill
            className={
              visibleSubcategoryList ? styles.arrowDown : styles.arrowTop
            }
            onClick={() => setVisibleSubcategoryList((prev) => !prev)}
          />
        )}
      </li>
      {visibleSubcategoryList && activeItem === item.name && rendersubcategory}
    </div>
  ));

  return (
    <>
      <ul className={styles.sortByButtons}>
        <li
          className={activeItem === null ? styles.active : null}
          onClick={() => setActiveItem(null)}
        >
          Всі
        </li>
        {renderCategory}
      </ul>
      <div className={styles.containerContent}>
        <h2>
          {activeItem === null ? 'Вся випічка' : selectedSort}
          {!!subcategory ? ` (${subcategory.name})` : null}
        </h2>
        <SortBy />
      </div>
    </>
  );
};

export default Categories;
