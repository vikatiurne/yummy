import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const role = useSelector((state) => state.auth.user.role);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(fetchLogout());
  };
  return (
    <div className={styles.logoWrapper}>
      <Button className={styles.basket}>
        {!isAuth ? (
          <>
            <Link to="auth">
              <p>Вхід</p>
            </Link>
            <span />
          </>
        ) : (
          <>
            <Link to="/">
              <p onClick={logoutHandler}>Вихід</p>
            </Link>
            <span />
          </>
        )}
        {!isAuth ? (
          <IoPerson className={styles.basketIcon} onClick={logoutHandler} />
        ) : (
          <>
            {role === 'ADMIN' ? (
              <p onClick={() => navigate('/admin')}>Адмін</p>
            ) : (
              <p>{userName}</p>
            )}
          </>
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
          <span />
          <div className={styles.basketInfo}>
            <MdShoppingCart className={styles.basketIcon} />
            <p>3</p>
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default Header;
