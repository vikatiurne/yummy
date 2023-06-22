import styles from '../App.module.css'
import Button from './UI/Button';

const Categories = () => {
  return (
    <div className={styles.sortBy}>
      <div className={styles.sortByButtons}>
        <Button onclick={()=>{}}>Всі</Button>
        <Button onclick={()=>{}}>День Народження</Button>
        <Button onclick={()=>{}}>Весілля</Button>
        <Button onclick={()=>{}}>Хрещення</Button>
        <Button onclick={()=>{}}>Для неї</Button>
        <Button onclick={()=>{}}>Для нього</Button>
      </div>
      <div className={styles.sortBySelect}>
        <p>
          Сортування за: <span>популярністю</span>
        </p>
      </div>
      <div className={styles.select}>
        <p>популярністю</p>
        <p>ціною</p>
        <p>алфавітом</p>
      </div>
    </div>
  );
};

export default Categories;
