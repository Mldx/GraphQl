import { useForm } from 'react-hook-form';
import styles from '../Form.module.scss';
import ValidationErrorMessage from '../ValidationErrorMessage';
import FormSubmitButton from '../FormSubmitButton';
import { useState } from 'react';
import ResponseErrorMessage from '../ResponseErrorMessage';

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
  const [respError, setRespError] = useState<null | string>(null);
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passRegex = /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)(?=.*[-_@$!%*?&])[a-zA-Zа-яА-Я\d\-_@$!%*?&]{8,}$/;
  const clearRespErrorMessage = () => setRespError(null);

  const onSubmit = (data: IRegisterForm) => {
    console.log(data);
    setRespError('auth/invalid-hash-derived-key-length'); //TODO: тест ошибки
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((data) => onSubmit(data))}
      noValidate={true}
      autoComplete="off"
    >
      <h1 className={styles.title}>Sign up</h1>

      <label className={styles.label}>
        <input
          className={styles.input}
          type="text"
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
      <FormSubmitButton text="Register" />
    </form>
  );
}

export default RegisterForm;
