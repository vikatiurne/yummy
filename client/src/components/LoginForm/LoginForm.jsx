import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { fetchLogin, fetchRegistration } from '../../pages/Auth/AuthSlice';
import Button from '../UI/Button/Button';
import AuthModal from '../Modals/AuthModal';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registr, setRegistr] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuth);

  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const nameHandler = (e) => setName(e.target.value);

  const loginHandler = () => {
    dispatch(fetchLogin({ email, password }));
    if (!isAuth) setModalActive(true);
  };

  const registrationHandler = () => {
    dispatch(fetchRegistration({ email, password, name }));
    if (!isAuth) setModalActive(true);
  };

  const registerLinkHandler = () => setRegistr(true);
  const loginLinkHandler = () => setRegistr(false);

  const renderForm = (
    <form className={styles.formWrapper} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.formFields}>
        {registr ? (
          <input
            type="text"
            placeholder="Ім'я"
            onChange={nameHandler}
            value={name}
            autoComplete="on"
          />
        ) : null}
        <input
          type="text"
          placeholder="E-mail"
          onChange={emailHandler}
          value={email}
          autoComplete="on"
        />
        <input
          type="password"
          placeholder="Пароль"
          onChange={passwordHandler}
          value={password}
          autoComplete="on"
        />
      </div>
      <div className={styles.formControl}>
        {!registr ? (
          <Button className={styles.success} onclick={loginHandler}>
            Увійти
          </Button>
        ) : (
          <Button className={styles.primary} onclick={registrationHandler}>
            Зареєструватися
          </Button>
        )}
      </div>
    </form>
  );

  const render = (
    <>
      {renderForm}
      <AuthModal active={modalActive} setActive={() => setModalActive(false)} />
      {!registr ? (
        <p className={styles.registrLink}>
          Немає акаунту?{' '}
          <span onClick={registerLinkHandler}>Зареєструватися</span>
        </p>
      ) : (
        <p className={styles.registrLink}>
          Маєте акаунт? <span onClick={loginLinkHandler}>Увійти</span>
        </p>
      )}
    </>
  );
  return !isAuth ? render : <Navigate to="/" />;
};

export default LoginForm;
