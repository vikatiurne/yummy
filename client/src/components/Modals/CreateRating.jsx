import { v4 as uuidv4 } from 'uuid';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';

import styles from './Modals.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCreateRating } from '../../pages/Prodact/ProdactSlice';

const ratingPanel = ['★', '★', '★', '★', '★'];

const CreateRating = ({ active, setActive, prodactId }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const dispatch = useDispatch();

  const voteHandler = () => {
    dispatch(fetchCreateRating({ rating, prodactId }));
    setActive();
  };

  return (
    <Modal active={active} setActive={setActive}>
      <div className={styles.stars}>
        {ratingPanel.map((item, i) => {
          const val = i + 1;
          return (
            <p
              className={val <= (rating || hover) ? styles.starFill : null}
              key={uuidv4()}
              //   value={val}
              onClick={() => setRating(val)}
              onMouseEnter={() => setHover(val)}
              onMouseLeave={() => setHover(null)}
            >
              {item}
            </p>
          );
        })}
      </div>
      <Button  onclick={voteHandler}>Голосувати</Button>
    </Modal>
  );
};

export default CreateRating;
