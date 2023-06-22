import React from 'react';
import { MdShoppingCart } from 'react-icons/md';
import logo from '../assets/cake_logo.png';
import styles from '../App.module.css';
import Button from './UI/Button';

const Header = () => {
  return (
    <div>
      <div className={styles.logoWrapper}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <div className={styles.logoName}>
            <h1>Yummy</h1>
            <p>найсмачніщі торти в світі</p>
          </div>
        </div>
        <Button className={styles.basket} onclick={()=>{}}>
          <p>500 ₴</p>
          <MdShoppingCart className={styles.basketIcon} />
          <p>3</p>
        </Button>
      </div>
    </div>
  );
};

export default Header;
