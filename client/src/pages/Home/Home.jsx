import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, Pagination, SortBy } from '../../components';

import {
  fetchGetAllProdact,
  fetchGetCategory,
  fetchGetSubcategory,
} from './HomeSlice';

import styles from './Home.module.css';
import ProdactItem from '../../components/ProdactItem/ProdactItem';

function Home() {
  const categoryId = useSelector((state) => state.home.categoryId);
  const subcategoryId = useSelector((state) => state.home.subcategoryId);
  const limit = useSelector((state) => state.home.limit);
  const page = useSelector((state) => state.home.page);
  const orderBy = useSelector((state) => state.home.sortBy);
  console.log(orderBy)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetCategory());
    dispatch(fetchGetSubcategory());
    dispatch(
      fetchGetAllProdact({ categoryId, subcategoryId, page, limit, orderBy })
    );
  }, [dispatch, categoryId, subcategoryId, page, limit, orderBy]);

  return (
    <>
      <div className={styles.sortBy}>
        <Categories />
      </div>
      <SortBy />
      <ProdactItem />
      <Pagination />
    </>
  );
}

export default Home;
