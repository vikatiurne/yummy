import { useEffect, useRef, useState } from 'react';
import { BsTriangleFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

import styles from './SortBy.module.css';
import { useDispatch } from 'react-redux';
import { selectedSortBy } from '../../pages/Home/HomeSlice';

const sortList = ['популярністю', 'ціною', 'алфавітом'];

const SortBy = () => {
  const [visibleSelectList, setVisibleSelectList] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const sortRef = useRef();

  const dispatch = useDispatch();

  const toggleVisibleList = () => {
    setVisibleSelectList((prev) => !prev);
  };

  const handleClickItem = (item) => {
    setActiveItem(item);
    setVisibleSelectList(false);
    let sortBy = '';
    if (item === 'популярністю') sortBy = 'rating';
    if (item === 'ціною') sortBy = 'price';
    if (item === 'алфавітом') sortBy = 'name';
    console.log(sortBy)
    dispatch(selectedSortBy(sortBy));
  };

  const handleOutsideClick = (e) => {
    if (sortRef.current && !sortRef.current.contains(e.target))
      setVisibleSelectList(false);
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className={styles.sortBySelect}>
      <BsTriangleFill
        className={visibleSelectList ? styles.arrowDown : styles.arrowTop}
      />
      <p>
        Сортування за:
        <span ref={sortRef} onClick={toggleVisibleList}>
          {activeItem === null ? 'популярністю' : activeItem}
        </span>
      </p>

      {visibleSelectList && (
        <ul className={styles.select}>
          {sortList.map((item) => (
            <li key={uuidv4()} onClick={() => handleClickItem(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortBy;
