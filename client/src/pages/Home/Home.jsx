import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, Pagination } from '../../components';

import {
  fetchGetAllProdact,
  fetchGetCategory,
  fetchGetSubcategory,
} from './HomeSlice';

import styles from './Home.module.css';

function Home() {
  const categoryId = useSelector((state) => state.home.categoryId);
  const subcategoryId = useSelector((state) => state.home.subcategoryId);
  const limit = useSelector((state) => state.home.limit);
  const page = useSelector((state) => state.home.page);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetCategory());
    dispatch(fetchGetSubcategory());
    dispatch(fetchGetAllProdact({ categoryId, subcategoryId, page, limit }));
  }, [dispatch, categoryId, subcategoryId, page, limit]);

  return (
    <>
      <div className={styles.sortBy}>
        <Categories />
      </div>
      <Pagination />
    </>
  );
}

export default Home;
