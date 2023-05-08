import styles from '../Form.module.scss';
import FormSubmitButton from '../FormSubmitButton';
import React, { useState } from 'react';
import ResponseErrorMessage from '../ResponseErrorMessage';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [respError, setRespError] = useState<null | string>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRespError('auth/invalid-hash-derived-key-length'); //TODO: тест ошибки
  };

  const clearRespErrorMessage = () => setRespError(null);

  return (
    <form
      className={styles.form}
      noValidate={true}
      autoComplete="off"
      onSubmit={(e) => handleSubmit(e)}
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
