import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';

import styles from './Create.module.css';

const CreateCategory = ({ active, setActive }) => {
  return (
    <Modal active={active} setActive={setActive}>
      <div className={styles.modalTitle}>
        <p>Додати категорію</p>
      </div>
      <div className={styles.modalConternt}>
        <form>
          <input type="text" placeholder="Назва категорії" />
          <Button className={styles.add}>Додати</Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateCategory;
