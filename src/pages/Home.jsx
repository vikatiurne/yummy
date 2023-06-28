import { useEffect, useState } from 'react';
import axios from 'axios';

import { CakeCard, Categories, SortBy } from '../components';

import styles from '../App.module.css';

const categories = [
  'День Народження',
  'Весілля',
  'Хрещення',
  'Для неї',
  'Для нього',
];

const sortList = ['популярністю', 'ціною', 'алфавітом'];
function Home() {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/db.json')
      .then((res) => setCakes(res.data.cakes));
  }, []);

  const renderCard = cakes.map((item) => {
    return <CakeCard key={`${item.name}+${item.id}`} {...item} />;
  });

  return (
    <>
      <div className={styles.sortBy}>
        <Categories categories={categories} />
        <SortBy sortList={sortList} />
      </div>
      <div className={styles.containerContent}>
        <h2>Всі торти</h2>
        <div className={styles.content}>{renderCard}</div>
      </div>
    </>
  );
}

export default Home;
