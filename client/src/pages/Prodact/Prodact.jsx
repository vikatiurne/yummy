import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Spiner from '../../components/UI/Spinner/Spiner';
import { fetchGetProdact } from './ProdactSlice';

const Prodact = () => {
  const prodact = useSelector((state) => state.prodact.prodact);
  const status = useSelector((state) => state.prodact.status);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetProdact({ id }));
  }, [dispatch, id]);

  return status !== 'success' ? (
    <Spiner />
  ) : (
    <div>
      <img
        src={process.env.REACT_APP_API_URL + prodact.img}
        alt={prodact.name}
      />
      <div>
        <h4>Опис продукту</h4>
        <p>{prodact.info[0].discription}</p>
        <p>Мінімальне замовлення {prodact.sizes[0]}</p>
        <h4>Вартість</h4>
        <p>
          {prodact.price} грн за {prodact.sizes[0]}
        </p>
      </div>
    </div>
  );
};

export default Prodact;
