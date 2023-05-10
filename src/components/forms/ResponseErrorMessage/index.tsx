import styles from './ResponseErrorMessage.module.scss';

interface IValidationErrorMessageProps {
  errorMessage: string | null;
}

function ResponseErrorMessage(props: IValidationErrorMessageProps) {
  const { errorMessage } = props;
  return errorMessage ? <div className={styles.validation_error}>{errorMessage}</div> : null;
}

export default ResponseErrorMessage;
