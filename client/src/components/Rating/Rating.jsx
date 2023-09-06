import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import styles from './Rating.module.css';
import CreateRating from '../Modals/CreateRating';

const Rating = ({ rating, prodactId }) => {
  const [rate, setRate] = useState(rating);
  const [activeModal, setActiveModal] = useState(false);

  const clickRatingHandler = () => {
    setActiveModal(true);
  };

  return (
    <>
      {activeModal && (
       <CreateRating  active={activeModal} prodactId={prodactId}
       setActive={() => setActiveModal(false)}/>
      )}
      <div className={styles.rating} onClick={clickRatingHandler}>
        <p>{rate}</p>
        <FaStar className={styles.activeStar} />
      </div>
    </>
  );
};

export default Rating;
