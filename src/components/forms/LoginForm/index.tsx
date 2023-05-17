import styles from '../Form.module.scss';
import FormSubmitButton from '../FormSubmitButton';
import React, { useState } from 'react';
import ResponseErrorMessage from '../ResponseErrorMessage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [respError, setRespError] = useState<null | string>(null);
  const placeholderEmail = t('forms.placeholder_email');
  const placeholderPassword = t('forms.placeholder_password');
  const handleSubmit = (e: React.FormEvent, email: string, pass: string) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        navigate('/main');
      })
      .catch((error) => {
        setRespError(error.code);
      });
  };

  const clearRespErrorMessage = () => setRespError(null);

  return (
    <form className={styles.form} noValidate={true} onSubmit={(e) => handleSubmit(e, email, pass)}>
      <h1 className={styles.title}>{t('forms.login.tittle')}</h1>

      <label className={styles.label}>
        <input
          className={styles.input}
          type="text"
          placeholder={placeholderEmail}
          value={email}
          onFocus={clearRespErrorMessage}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className={styles.label}>
        <input
          className={styles.input}
          placeholder={placeholderPassword}
          type="password"
          value={pass}
          autoComplete="off"
          onFocus={clearRespErrorMessage}
          onChange={(e) => setPass(e.target.value)}
        />
      </label>
      <ResponseErrorMessage errorMessage={respError} />
      <FormSubmitButton text="forms.login.button" />
    </form>
  );
}

export default LoginForm;
