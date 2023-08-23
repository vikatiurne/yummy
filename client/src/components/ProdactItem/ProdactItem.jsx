import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './ProdactItem.module.css';
import { ProdactCard } from '..';
import { fetchCreateProdact } from '../../pages/Admin/AdminSlice';

const ProdactItem = () => {
  const prodacts = useSelector((state) => state.home.prodacts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirectHandler = (id) => {
    navigate('/prodact/' + id);
    dispatch(fetchCreateProdact({ id }));
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

  return <div className={styles.content}>{renderCard}</div>;
};

export default ProdactItem;
