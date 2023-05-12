import styles from './ValidationErrorMessage.module.scss';

interface IValidationErrorMessageProps {
  errorMessage: string | undefined;
}

function ValidationErrorMessage(props: IValidationErrorMessageProps) {
  const { errorMessage } = props;
  return errorMessage ? <span className={styles.validation_error}>{errorMessage}</span> : null;
}

export default ValidationErrorMessage;
