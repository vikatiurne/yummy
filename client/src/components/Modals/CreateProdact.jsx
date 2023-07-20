import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';

import styles from './Create.module.css';

const CreateCategory = ({ active, setActive }) => {
  return (
    <Modal active={active} setActive={setActive}>
      <div className={styles.modalTitle}>
        <p>Додати продукт</p>
      </div>
      <div className={styles.modalConternt}>
        <form>
          <select name="category" id="c-1">

          </select>
          <input type="text" placeholder="Назва продукта" />
          <input type="text" placeholder="Вартість продукта" />
          <input type="text" placeholder="Вартість продукта" />
          <Button className={styles.add}>Додати</Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateCategory;
