import styles from './FormSubmitButton.module.scss';
import { useTranslation } from 'react-i18next';

interface IFormSubmitProps {
  text: string;
}

function FormSubmitButton({ text }: IFormSubmitProps) {
  const { t } = useTranslation();
  return (
    <button type="submit" className={styles.button}>
      {t(text)}
    </button>
  );
}

export default FormSubmitButton;
