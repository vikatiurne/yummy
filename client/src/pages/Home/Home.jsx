import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, Pagination, SortBy, Prodacts } from '../../components';

import {
  fetchGetAllProdact,
  fetchGetCategory,
  fetchGetRatings,
  fetchGetSubcategory,
} from './HomeSlice';

import styles from './Home.module.css';

function Home() {
  const categoryId = useSelector((state) => state.home.categoryId);
  const subcategoryId = useSelector((state) => state.home.subcategoryId);
  const limit = useSelector((state) => state.home.limit);
  const page = useSelector((state) => state.home.page);
  const orderBy = useSelector((state) => state.home.sortBy);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetCategory());
    dispatch(fetchGetSubcategory());
    dispatch(fetchGetRatings())
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
      <Prodacts />
      <Pagination />
    </>
  );
}

export default Home;
