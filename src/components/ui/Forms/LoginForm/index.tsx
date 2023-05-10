import styles from '../Form.module.scss';
import FormSubmitButton from '../FormSubmitButton';
import React, { useState } from 'react';
import ResponseErrorMessage from '../ResponseErrorMessage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [respError, setRespError] = useState<null | string>(null);

  const handleSubmit = (e: React.FormEvent, email: string, pass: string) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        setRespError(error.code);
      });
  };

  const clearRespErrorMessage = () => setRespError(null);

  return (
    <form
      className={styles.form}
      noValidate={true}
      autoComplete="off"
      onSubmit={(e) => handleSubmit(e, email, pass)}
    >
      <h1 className={styles.title}>Login</h1>

      <label className={styles.label}>
        <input
          className={styles.input}
          type="text"
          placeholder="Email"
          value={email}
          onFocus={clearRespErrorMessage}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className={styles.label}>
        <input
          className={styles.input}
          placeholder="Password"
          type="password"
          value={pass}
          onFocus={clearRespErrorMessage}
          onChange={(e) => setPass(e.target.value)}
        />
      </label>
      <ResponseErrorMessage errorMessage={respError} />
      <FormSubmitButton text="Login" />
    </form>
  );
}

export default LoginForm;
