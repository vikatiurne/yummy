import React from 'react';
import Button from '../UI/Button';

import styles from './AdminPanel.module.css'

const AdminPanel = () => {
  return (
    <div className={styles.adminWrapper}>
      <Button>Додати категорію</Button>
      <Button>Додати підкатегорію</Button>
      <Button>Додати продукт</Button>
    </div>
  );
};

export default AdminPanel;
