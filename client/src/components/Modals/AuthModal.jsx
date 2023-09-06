import { useSelector } from 'react-redux';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import styles from './Modals.module.css';

const AuthModal = ({ active, setActive, message }) => {
  const err = useSelector((state) => state.auth.error);

  const render = (
    <Modal active={active} setActive={setActive}>
      {!!err && (
        <div className={styles.authModal}>
          <p>{err}</p>
          <Button onclick={setActive}>Зрозуміло</Button>
        </div>
      )}
    </Modal>
  );

  return render;
};

export default AuthModal;
