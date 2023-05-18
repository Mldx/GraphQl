import { useForm } from 'react-hook-form';
import styles from '../Form.module.scss';
import ValidationErrorMessage from '../ValidationErrorMessage';
import FormSubmitButton from '../FormSubmitButton';
import { useState } from 'react';
import ResponseErrorMessage from '../ResponseErrorMessage';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [respError, setRespError] = useState<null | string>(null);
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const placeholderEmail = t('forms.placeholder_email');
  const placeholderPassword = t('forms.placeholder_password');
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
      <h1 className={styles.title}>{t('forms.signup.tittle')}</h1>

      <label className={styles.label}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          placeholder={placeholderEmail}
          onFocus={clearRespErrorMessage}
          {...register('email', {
            required: 'validateMessages.required',
            pattern: {
              value: emailRegex,
              message: 'validateMessages.emailCheck',
            },
          })}
        />
        <ValidationErrorMessage errorMessage={errors.email?.message} />
      </label>

      <label className={styles.label}>
        <input
          className={styles.input}
          placeholder={placeholderPassword}
          type="password"
          autoComplete="off"
          onFocus={clearRespErrorMessage}
          {...register('password', {
            required: 'validateMessages.required',
            validate: {
              oneLetterCheck: (v) =>
                /^(?=.*[a-zA-Zа-яА-Я]).*$/.test(v) || 'validateMessages.oneLetterCheck',
              oneDigitCheck: (v) => /^(?=.*\d).*$/.test(v) || 'validateMessages.oneDigitCheck',
              oneSpecCheck: (v) =>
                /^(?=.*[-_@#$%^&+=]).*$/.test(v) || 'validateMessages.oneSpecCheck',
              min8sym: (v) => /^.{8,}$/.test(v) || 'validateMessages.min8sym',
            },
          })}
        />
        <ValidationErrorMessage errorMessage={errors.password?.message} />
      </label>

      <ResponseErrorMessage errorMessage={respError} />
      <FormSubmitButton text="forms.signup.button" />
    </form>
  );
}

export default RegisterForm;
