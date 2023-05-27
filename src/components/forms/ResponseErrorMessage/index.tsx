import styles from './ResponseErrorMessage.module.scss';
import { useTranslation } from 'react-i18next';

interface IValidationErrorMessageProps {
  errorMessage: string | null;
}

function ResponseErrorMessage(props: IValidationErrorMessageProps) {
  const { t } = useTranslation();
  const { errorMessage } = props;
  return errorMessage ? (
    <div className={styles.response_error}>{t(`firebaseResponseMessage.${errorMessage}`)}</div>
  ) : null;
}

export default ResponseErrorMessage;
