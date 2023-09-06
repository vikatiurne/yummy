import { useSelector } from 'react-redux';

import styles from './Prodacts.module.css';
import { ProdactCard } from '..';

const Prodacts = () => {
  const prodacts = useSelector((state) => state.home.prodacts);

  const renderCard = prodacts.map((item) => (
    <ProdactCard key={`${item.name}+${item.id}`} {...item} activeRate={true}/>
  ));
 

  return <div className={styles.content}>{renderCard}</div>;
};

export default Prodacts;
