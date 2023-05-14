import styles from './FormSubmitButton.module.scss';

interface IFormSubmitProps {
  text: string;
}

function FormSubmitButton({ text }: IFormSubmitProps) {
  return (
    <button type="submit" className={styles.button}>
      {text}
    </button>
  );
}

export default FormSubmitButton;
