import styles from './ValidationErrorMessage.module.scss';
import { useTranslation } from 'react-i18next';

interface IValidationErrorMessageProps {
  errorMessage: string | undefined;
}

function ValidationErrorMessage(props: IValidationErrorMessageProps) {
  const { t } = useTranslation();
  const { errorMessage } = props;
  return errorMessage ? <span className={styles.validation_error}>{t(errorMessage)}</span> : null;
}

export default ValidationErrorMessage;
