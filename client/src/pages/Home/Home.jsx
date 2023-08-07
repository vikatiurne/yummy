import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ProdactCard, Categories } from '../../components';

import { fetchGetCategory, fetchGetSubcategory } from './HomeSlice';

import styles from './Home.module.css';

function Home() {
  const [prodacts, setProdacts] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGetCategory());
    dispatch(fetchGetSubcategory());
  }, [dispatch]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/prodact')
      .then((res) => setProdacts(res.data.rows));
  }, []);

  const redirectHandler = (id) => {
    navigate('/prodact/' + id);
  };

  const renderCard = prodacts.map((item) => {
    return (
      <ProdactCard
        key={`${item.name}+${item.id}`}
        {...item}
        onclick={() => redirectHandler(item.id)}
      />
    );
  });

  return (
    <>
      <div className={styles.sortBy}>
        <Categories />
      </div>

      <div className={styles.content}>{renderCard}</div>
    </>
  );
}

export default Home;
