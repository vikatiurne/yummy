import { ProdactCard } from '..';
import styles from './Prodacts.module.css';

const Prodacts = ({prodacts}) => {
 
  const renderCard = prodacts.map((item) => (
    <ProdactCard key={`${item.name}+${item.id}`} {...item} />
  ));

  return <div className={styles.content}>{renderCard}</div>;
};

export default Prodacts;
