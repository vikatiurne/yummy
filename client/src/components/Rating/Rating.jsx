import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';

import CreateRating from '../Modals/CreateRating';
import WarningAuth from '../Modals/WarningAuth';

import { fetchCheckVote } from '../../pages/Prodact/ProdactSlice';

import styles from './Rating.module.css';

const Rating = ({ rating, prodactId }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [activeModalAuth, setActiveModalAuth] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const clickRatingHandler = () => {
    const userId = user.id;
    if (userId) {
      dispatch(fetchCheckVote({ prodactId, userId }));
      setActiveModal(true);
    }else{
      setActiveModalAuth(true)
    }
  };

  return (
    <>
      <CreateRating
        active={activeModal}
        prodactId={prodactId}
        setActive={() => setActiveModal(false)}
      />

      <WarningAuth
        active={activeModalAuth}
        setActive={() => setActiveModalAuth(false)}
      />

      <div className={styles.rating} onClick={clickRatingHandler}>
        <p>{rating}</p>
        <FaStar className={styles.activeStar} />
      </div>
    </>
  );
};

export default Rating;
