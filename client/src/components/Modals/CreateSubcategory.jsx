import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { Modal, Button,  Select } from '../index';

import { fetchCreateSubcategory } from '../../pages/Admin/AdminSlice';
import { fetchGetSubcategory } from '../../pages/Home/HomeSlice';
import GetServices from '../../services/GetServices';

import styles from './Modals.module.css';

const CreateSubcategory = ({ active, setActive }) => {
  const [subcategory, setSubcategory] = useState('');
  const [category, setCategory] = useState('Оберіть категорію');
  const [categoryId, setCategoryId] = useState(null);

  const subcategories = useSelector((state) => state.home.subcategory);
  const categories = useSelector((state) => state.home.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetSubcategory());
  }, [dispatch]);

  const selectHandler = async (e) => {
    const name = e.target.value;
    setCategory(name);

    const categories = await GetServices.getCategories();
    const filterCategory = await categories.data.filter(
      (category) => category.name === name
    );
    setCategoryId(filterCategory[0].id);
  };

  const inputHandler = (e) => {
    setSubcategory(e.target.value);
  };

  const addSubcategoryHandler = () => {
    dispatch(
      fetchCreateSubcategory({ name: subcategory, categoryName: category })
    );
    setActive();
    setSubcategory('');
    setCategoryId(null);
    setCategory('Оберіть категорію');
  };

  const closeSubcategoryHandler = () => {
    setActive();
    setSubcategory('');
    setCategoryId(null);
    setCategory('Оберіть категорію');
  };

  const renderSubcategoryList = subcategories
    .filter((item) => item.categoryId === categoryId)
    .map((item) => <li key={uuidv4()}>{item.name}</li>);

  return (
    <Modal active={active} setActive={closeSubcategoryHandler}>
      <div className={styles.modalTitle}>
        <p>Додати підкатегорію</p>
      </div>
      <div className={styles.modalContent}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Select name={subcategory} value={category} onchange={selectHandler}>
            <option disabled defaultValue="Оберіть категорію">
              {category}
            </option>
            {categories.map((item) => (
              <option key={uuidv4()} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
          <input
            type="text"
            placeholder="Назва підкатегорії"
            value={subcategory}
            onChange={inputHandler}
          />
          <Button className={styles.add} onclick={addSubcategoryHandler}>
            Додати
          </Button>
        </form>
        <div className={styles.subcategoryList}>
          {!!categoryId && <p>Існуючі підкатегорії:</p>}
          <ul>{renderSubcategoryList}</ul>
          <p>{subcategory}</p>
        </div>
      </div>
    </Modal>
  );
};

export default CreateSubcategory;
