import { useForm } from 'react-hook-form';
import styles from '../Form.module.scss';
import ValidationErrorMessage from '../ValidationErrorMessage';
import FormSubmitButton from '../FormSubmitButton';
import { useState } from 'react';
import ResponseErrorMessage from '../ResponseErrorMessage';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface IRegisterForm {
  email: string;
  password: string;
}

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>();

  const navigate = useNavigate();
  const [respError, setRespError] = useState<null | string>(null);
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passRegex = /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)(?=.*[-_@$!%*?&])[a-zA-Zа-яА-Я\d\-_@$!%*?&]{8,}$/;

  const clearRespErrorMessage = () => setRespError(null);

  const onSubmit = (data: IRegisterForm) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        navigate('/main');
      })
      .catch((error) => {
        setRespError(error.code);
      });
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((data) => onSubmit(data))}
      noValidate={true}
    >
      <h1 className={styles.title}>Create Account</h1>

      <label className={styles.label}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          placeholder="Email"
          onFocus={clearRespErrorMessage}
          {...register('email', {
            required: 'Field is required',
            pattern: {
              value: emailRegex,
              message: 'Incorrect pattern',
            },
          })}
        />
        <ValidationErrorMessage errorMessage={errors.email?.message} />
      </label>

      <label className={styles.label}>
        <input
          className={styles.input}
          placeholder="Password"
          type="password"
          autoComplete="off"
          onFocus={clearRespErrorMessage}
          {...register('password', {
            required: 'Field is required',
            pattern: {
              value: passRegex,
              message: 'Incorrect pattern',
            },
          })}
        />
        <ValidationErrorMessage errorMessage={errors.password?.message} />
      </label>

      <ResponseErrorMessage errorMessage={respError} />
      <FormSubmitButton text="Sign up" />
    </form>
  );
}

export default RegisterForm;
