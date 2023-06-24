
import { FaPlus } from 'react-icons/fa';

import { Categories, SortBy } from '../components';

import weading from '../assets/weading.jpg';
import styles from '../App.module.css';

const categories = [
  'День Народження',
  'Весілля',
  'Хрещення',
  'Для неї',
  'Для нього',
];

const sortList = ['популярністю', 'ціною', 'алфавітом'];
function Home() {
  return (
    <>
      <div className={styles.sortBy}>
        <Categories categories={categories} />
        <SortBy sortList={sortList} />
      </div>
      <div className={styles.containerContent}>
        <h2>Всі торти</h2>
        <div className={styles.content}>
          <div className={styles.card}>
            <img src={weading} alt="weading cake" />
            <h3>Весільний білий</h3>
            <div className={styles.options}>
              <p className={styles.option1}>з прикрасами</p>
              <p className={styles.option2}>без прикрас</p>
              <p className={styles.option3}>1кг</p>
              <p className={styles.option4}>2кг</p>
              <p className={styles.option5}>3кг</p>
            </div>
            <div className={styles.priceInfo}>
              <p>від 700₴</p>
              <button>
                <FaPlus className={styles.iconPlus} /> Додати <span>20</span>
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <img src={weading} alt="weading cake" />
            <h3>Весільний білий</h3>
            <div className={styles.options}>
              <p className={styles.option1}>з прикрасами</p>
              <p className={styles.option2}>без прикрас</p>
              <p className={styles.option3}>1кг</p>
              <p className={styles.option4}>2кг</p>
              <p className={styles.option5}>3кг</p>
            </div>
            <div className={styles.priceInfo}>
              <p>від 700₴</p>
              <button>
                <FaPlus className={styles.iconPlus} /> Додати <span>20</span>
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <img src={weading} alt="weading cake" />
            <h3>Весільний білий</h3>
            <div className={styles.options}>
              <p className={styles.option1}>з прикрасами</p>
              <p className={styles.option2}>без прикрас</p>
              <p className={styles.option3}>1кг</p>
              <p className={styles.option4}>2кг</p>
              <p className={styles.option5}>3кг</p>
            </div>
            <div className={styles.priceInfo}>
              <p>від 700₴</p>
              <button>
                <FaPlus className={styles.iconPlus} /> Додати <span>20</span>
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <img src={weading} alt="weading cake" />
            <h3>Весільний білий</h3>
            <div className={styles.options}>
              <p className={styles.option1}>з прикрасами</p>
              <p className={styles.option2}>без прикрас</p>
              <p className={styles.option3}>1кг</p>
              <p className={styles.option4}>2кг</p>
              <p className={styles.option5}>3кг</p>
            </div>
            <div className={styles.priceInfo}>
              <p>від 700₴</p>
              <button>
                <FaPlus className={styles.iconPlus} /> Додати <span>20</span>
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <img src={weading} alt="weading cake" />
            <h3>Весільний білий</h3>
            <div className={styles.options}>
              <p className={styles.option1}>з прикрасами</p>
              <p className={styles.option2}>без прикрас</p>
              <p className={styles.option3}>1кг</p>
              <p className={styles.option4}>2кг</p>
              <p className={styles.option5}>3кг</p>
            </div>
            <div className={styles.priceInfo}>
              <p>від 700₴</p>
              <button>
                <FaPlus className={styles.iconPlus} /> Додати <span>20</span>
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <img src={weading} alt="weading cake" />
            <h3>Весільний білий</h3>
            <div className={styles.options}>
              <p className={styles.option1}>з прикрасами</p>
              <p className={styles.option2}>без прикрас</p>
              <p className={styles.option3}>1кг</p>
              <p className={styles.option4}>2кг</p>
              <p className={styles.option5}>3кг</p>
            </div>
            <div className={styles.priceInfo}>
              <p>від 700₴</p>
              <button>
                <FaPlus className={styles.iconPlus} /> Додати <span>20</span>
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <img src={weading} alt="weading cake" />
            <h3>Весільний білий</h3>
            <div className={styles.options}>
              <p className={styles.option1}>з прикрасами</p>
              <p className={styles.option2}>без прикрас</p>
              <p className={styles.option3}>1кг</p>
              <p className={styles.option4}>2кг</p>
              <p className={styles.option5}>3кг</p>
            </div>
            <div className={styles.priceInfo}>
              <p>від 700₴</p>
              <button>
                <FaPlus className={styles.iconPlus} /> Додати <span>20</span>
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <img src={weading} alt="weading cake" />
            <h3>Весільний білий</h3>
            <div className={styles.options}>
              <p className={styles.option1}>з прикрасами</p>
              <p className={styles.option2}>без прикрас</p>
              <p className={styles.option3}>1кг</p>
              <p className={styles.option4}>2кг</p>
              <p className={styles.option5}>3кг</p>
            </div>
            <div className={styles.priceInfo}>
              <p>від 700₴</p>
              <button>
                <FaPlus className={styles.iconPlus} /> Додати <span>20</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
