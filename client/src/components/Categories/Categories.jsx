import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsTriangleFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

import styles from './Categories.module.css';
import SortBy from '../SortBy/SortBy';
import { useNavigate } from 'react-router-dom';
import { ProdactCard } from '..';
import {
  selectedCategory,
  selectedSubcategory,
} from '../../pages/Home/HomeSlice';

const Categories = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [visibleSubcategoryList, setVisibleSubcategoryList] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Вся випічка');
  const [subcategory, setSubcategory] = useState('');

  const categories = useSelector((state) => state.home.category);
  const categoryId = useSelector((state) => state.home.categoryId);
  const subcategories = useSelector((state) => state.home.subcategory);
  const prodacts = useSelector((state) => state.home.prodacts);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const clickAllCategoryHandler = () => {
    setActiveItem(null);
    dispatch(selectedCategory(null));
    setSubcategory('');
  };

  const clickCategoryHandler = (name, id) => {
    setActiveItem(name);
    setSelectedSort(name);
    setSubcategory('');
    dispatch(selectedCategory(id));
    dispatch(selectedSubcategory(null));
  };

  const clickSubcategoryHandler = (name, id) => {
    setSubcategory(name);
    setVisibleSubcategoryList(false);
    dispatch(selectedSubcategory(id));
  };

  const renderSubcategory = (
    <ul className={styles.select}>
      {subcategories
        .filter((item) => item.categoryId === categoryId)
        .map((item) => (
          <li
            key={uuidv4()}
            onClick={() => clickSubcategoryHandler(item, item.id)}
          >
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
      {visibleSubcategoryList && activeItem === item.name && renderSubcategory}
    </div>
  ));

  const redirectHandler = (id) => {
    navigate('/prodact/' + id);
  };

  const renderCard = prodacts.map((item) => {
    return (
      <ProdactCard
        key={`${item.name}+${item.id}`}
        {...item}
        onclick={() => redirectHandler(item.id)}
      />
    );
  });

  return (
    <>
      <ul className={styles.sortByButtons}>
        <li
          className={activeItem === null ? styles.active : null}
          onClick={clickAllCategoryHandler}
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
      </div>
        <SortBy />
      <div className={styles.content}>{renderCard}</div>
    </>
  );
};

export default Categories;
