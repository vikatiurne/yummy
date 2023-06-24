import React from 'react';
import { MdShoppingCart } from 'react-icons/md';
import logo from '../assets/cake_logo.png';
import styles from '../App.module.css';
import Button from './UI/Button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={styles.logoWrapper}>
      <Link to="/">
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <div className={styles.logoName}>
            <h1>Yummy</h1>
            <p>найсмачніщі торти в світі</p>
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
