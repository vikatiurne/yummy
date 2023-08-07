import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaFileDownload } from 'react-icons/fa';

import GetServices from '../../services/GetServices';

import { Modal, Button, Select, Input } from '../index';

import styles from './Modals.module.css';
import { fetchCreateProdact } from '../../pages/Admin/AdminSlice';

const CreateProdact = ({ active, setActive }) => {
  const [category, setCategory] = useState('Оберіть категорію');
  const [subcategory, setSubcategory] = useState('Оберіть підкатегорію');
  const [categoryId, setCategoryId] = useState(null);
  const [prodactName, setProdactName] = useState('');
  const [price, setPrice] = useState('');
  const [size1, setSize1] = useState('');
  const [size2, setSize2] = useState('');
  const [size3, setSize3] = useState('');
  const [info, setInfo] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  console.log(info)

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.home.category);

  const subcategories = useSelector((state) => state.home.subcategory);

  const selectHandler = async (e) => {
    const name = e.target.value;
    setCategory(name);
    const categories = await GetServices.getCategories();
    const filterCategory = await categories.data.filter(
      (category) => category.name === name
    );
    setCategoryId(filterCategory[0].id);
    setSubcategory('Оберіть підкатегорію');
  };

  const selectFile = (e) => {
    setFileName(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  const closeSubcategoryHandler = () => {
    setActive();
    setSubcategory('Оберіть підкатегорію');
    setCategoryId(null);
    setCategory('Оберіть категорію');
    setProdactName('');
    setPrice('');
    setSize1('');
    setSize2('');
    setSize3('');
    setInfo('');
    setFile('');
    setFileName('')
  };

  const addProdactHandler = () => {
    const selectedSubcategory = subcategories.filter(
      (item) => item.name === subcategory
    );
    let sizes = `${size1},${size2},${size3}`;

    const formData = new FormData();
    formData.append('name', prodactName);
    formData.append('price', price);
    formData.append('sizes', sizes);
    formData.append('info', info);
    formData.append('img', file);
    formData.append('categoryId', categoryId);
    formData.append('subcategoryId', selectedSubcategory[0].id);

    dispatch(fetchCreateProdact(formData));
    closeSubcategoryHandler()
  };

  return (
    <Modal active={active} setActive={closeSubcategoryHandler}>
      <div className={styles.modalTitle}>
        <p>Додати продукт</p>
      </div>
      <div className={styles.modalContent}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.options}>
            <Select name="category" value={category} onchange={selectHandler}>
              <option disabled defaultValue="Оберіть категорію">
                {category}
              </option>
              {categories.map((item) => (
                <option key={uuidv4()}>{item.name}</option>
              ))}
            </Select>

            <Select
              name="subcategory"
              value={subcategory}
              onchange={(e) => setSubcategory(e.target.value)}
            >
              <option disabled defaultValue="Оберіть підкатегорію">
                {subcategory}
              </option>
              {!categoryId
                ? subcategories.map((item) => (
                    <option key={uuidv4()}>{item.name}</option>
                  ))
                : subcategories
                    .filter((item) => item.categoryId === categoryId)
                    .map((item) => <option key={uuidv4()}>{item.name}</option>)}
            </Select>
          </div>
          <div className={styles.priceName}>
            <Input
              type="text"
              placeholder="Назва продукта"
              value={prodactName}
              onChange={(e) => setProdactName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Вартість продукта"
              value={price}
              onChange={(e) => Number(setPrice(e.target.value))}
            />
          </div>
          <div className={styles.sizes}>
            <input
              type="text"
              placeholder="Розмір 1"
              value={size1}
              onChange={(e) => setSize1(e.target.value)}
            />
            <input
              type="text"
              placeholder="Розмір 2"
              value={size2}
              onChange={(e) => setSize2(e.target.value)}
            />
            <input
              type="text"
              placeholder="Розмір 3"
              value={size3}
              onChange={(e) => setSize3(e.target.value)}
            />
          </div>
          <label className={styles.fileUpload}>
            <input type="file" onChange={selectFile} />
            {!fileName ? 'Завантажити зображення' : fileName}
            <FaFileDownload className={styles.iconDownload} />
          </label>
          <textarea
            placeholder="Опис продукту"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
          <Button className={styles.add} onclick={addProdactHandler}>
            Додати
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateProdact;
