import { useForm } from 'react-hook-form';
import styles from './RegisterForm.module.scss';
import ValidationErrorMessage from '../ValidationErrorMessage';
import FormSubmitButton from '../FormSubmitButton';

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

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((data) => console.log(data))}
      noValidate={true}
      autoComplete="off"
    >
      <h1 className={styles.title}>Sign up</h1>

      <label className={styles.label}>
        <input
          className={styles.input}
          type="text"
          placeholder="Email"
          {...register('email', {
            required: 'Field is required',
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
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
          {...register('password', {
            required: 'Field is required',
            pattern: {
              value:
                /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)(?=.*[-_@$!%*?&])[a-zA-Zа-яА-Я\d\-_@$!%*?&]{8,}$/,
              message: 'Incorrect pattern',
            },
          })}
        />
        <ValidationErrorMessage errorMessage={errors.password?.message} />
      </label>

      <FormSubmitButton text="Register" />
    </form>
  );
}

export default RegisterForm;
