import { useEffect, useState } from 'react';
import axios from 'axios';

import { ProdactCard, Categories, SortBy } from '../../components';

import styles from './Home.module.css';

// const categories = [
//   'День Народження',
//   'Весілля',
//   'Хрещення',
//   'Для неї',
//   'Для нього',
// ];

const sortList = ['популярністю', 'ціною', 'алфавітом'];
function Home() {
  const [prodacts, setProdacts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/prodact')
      .then((res) => setProdacts(res.data.rows));
  }, []);

  const renderCard = prodacts.map((item) => {
    return <ProdactCard key={`${item.name}+${item.id}`} {...item} />;
  });

  return (
    <>
      <div className={styles.sortBy}>
        <Categories />
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
