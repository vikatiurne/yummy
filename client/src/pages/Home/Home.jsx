import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, Pagination, SortBy, Prodacts } from '../../components';

import {
  fetchGetAllProdact,
  fetchGetCategory,
  fetchGetSubcategory,
} from './HomeSlice';

import styles from './Home.module.css';
import { fetchGetGoogleUser } from '../Auth/AuthSlice';

function Home() {
  const categoryId = useSelector((state) => state.home.categoryId);
  const subcategoryId = useSelector((state) => state.home.subcategoryId);
  const limit = useSelector((state) => state.home.limit);
  const page = useSelector((state) => state.home.page);
  const orderBy = useSelector((state) => state.home.orderBy);
  const sortBy = useSelector((state) => state.home.sortBy);
  const ratingById = useSelector(state=>state.prodact.rating)
  const prodactsList = useSelector((state) => state.home.prodacts);
   
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetCategory());
    dispatch(fetchGetSubcategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchGetAllProdact({ categoryId, subcategoryId, page, limit, orderBy, sortBy })
    );
  }, [dispatch, categoryId, subcategoryId, page, limit, orderBy, sortBy, ratingById]);

  useEffect(() => {
    dispatch(fetchGetGoogleUser());
  }, [dispatch]);

  return (
    <>
      <div className={styles.sortBy}>
        <Categories />
      </div>
      <SortBy />
      <Prodacts prodacts={prodactsList}/>
      <Pagination />
    </>
  );
}

export default Home;
