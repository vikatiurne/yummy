import { useState } from 'react';
import Button from '../UI/Button/Button';

import styles from './AdminPanel.module.css';
import { CreateCategory, CreateProdact, CreateSubcategory } from '..';

const AdminPanel = () => {
  const [buttonsVisibility, setButtonVisibility] = useState(false);
  const [modalCategoryActive, setModalCategoryActive] = useState(false);
  const [modalSubcategoryActive, setModalSubcategoryActive] = useState(false);
  const [modalProdactActive, setModalProdactActive] = useState(false);

  return (
    <div className={styles.adminWrapper}>
      <Button
        className={styles.toggleAdminPanel}
        onclick={() => setButtonVisibility((prev) => !prev)}
      >
        Відкрити панень адміністратора
      </Button>
      {buttonsVisibility && (
        <div className={styles.adminOptions}>
          <Button onclick={() => setModalCategoryActive(true)}>
            Додати категорію
          </Button>
          <Button onclick={() => setModalSubcategoryActive(true)}>
            Додати підкатегорію
          </Button>
          <Button onclick={() => setModalProdactActive(true)}>
            Додати продукт
          </Button>
          <CreateCategory
            active={modalCategoryActive}
            setActive={() => setModalCategoryActive()}
          />
          <CreateSubcategory
            active={modalSubcategoryActive}
            setActive={() => setModalSubcategoryActive()}
          />
          <CreateProdact
            active={modalProdactActive}
            setActive={() => setModalProdactActive()}
          />
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
