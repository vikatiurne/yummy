import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingCart } from 'react-icons/md';
import { IoPerson } from 'react-icons/io5';

import logo from '../../assets/cake_logo.png';

import styles from './Header.module.css';
import Button from '../UI/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogout } from '../../pages/Auth/AuthSlice';

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userName = useSelector((state) => state.auth.user.name);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(fetchLogout());
  };
  return (
    <div className={styles.logoWrapper}>
      <Button className={styles.basket}>
        {!isAuth ? (
          <Link to="auth">
            <p>Вхід</p>
          </Link>
        ) : (
          <p onClick={logoutHandler}>Вихід</p>
        )}
        {!isAuth ? (
          <IoPerson className={styles.basketIcon} onClick={logoutHandler} />
        ) : (
          <p>{userName}</p>
        )}
      </Button>

      <Link to="/">
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <div className={styles.logoName}>
            <h1>Yummy</h1>
            <p>найсмачніщі солодощі в світі</p>
          </div>
        </div>
      </Link>
      <Link to="basket">
        <Button className={styles.basket} onclick={() => {}}>
          <p>500 ₴</p>
          <MdShoppingCart className={styles.basketIcon} />
          <p>3</p>
        </Button>
      </Link>
    </div>
  );
};

export default Header;
