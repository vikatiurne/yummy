import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { fetchCreateCategory } from '../../pages/Admin/AdminSlice';

import {Modal, Button, Input} from '../index';

import styles from './Modals.module.css';

const CreateCategory = ({ active, setActive }) => {
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  const addCategoryHandler = () => {
    dispatch(fetchCreateCategory({ name: category }));
    setCategory('');
    setActive()
  };

  const inputHandler = (e) => setCategory(e.target.value);

  return (
    <Modal active={active} setActive={setActive}>
      <div className={styles.modalTitle}>
        <p>Додати категорію</p>
      </div>
      <div className={styles.modalContent}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            placeholder="Назва категорії"
            value={category}
            onChange={inputHandler}
          />
          <Button className={styles.add} onclick={addCategoryHandler}>
            Додати
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateCategory;
