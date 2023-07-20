import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchLogin, fetchRegistration } from '../../pages/Auth/AuthSlice';
import Button from '../UI/Button';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registr, setRegistr] = useState(false);

  const dispatch = useDispatch();

  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const nameHandler = (e) => setName(e.target.value);

  const loginHandler = () => {
    dispatch(fetchLogin({ email, password }));
    setEmail('');
    setPassword('');
  };
  const registrationHandler = () => {
    dispatch(fetchRegistration({ email, password, name }));
    setEmail('');
    setPassword('');
    setName('');
  };

  const registerLinkHandler = () => setRegistr(true);
  const loginLinkHandler = () => setRegistr(false);

  return (
    <>
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
            <Link to="/">
              <Button className={styles.success} onclick={loginHandler}>
                Увійти
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button className={styles.primary} onclick={registrationHandler}>
                Зареєструватися
              </Button>
            </Link>
          )}
        </div>
      </form>
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
};

export default LoginForm;
