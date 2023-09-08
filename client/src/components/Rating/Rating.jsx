import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';

import CreateRating from '../Modals/CreateRating';

import { fetchCheckVote } from '../../pages/Prodact/ProdactSlice';

import styles from './Rating.module.css';

const Rating = ({ rating, prodactId }) => {
 
  const [activeModal, setActiveModal] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const userId = user.id;

  const clickRatingHandler = () => {
    dispatch(fetchCheckVote({ prodactId, userId }));
    setActiveModal(true);
  };
  console.log(activeModal)

  return (
    <>
      <CreateRating
        active={activeModal}
        prodactId={prodactId}
        setActive={() => setActiveModal(false)}
      />

      <div className={styles.rating} onClick={clickRatingHandler}>
        <p>{rating}</p>
        <FaStar className={styles.activeStar} />
      </div>
    </>
  );
};

export default Rating;
