import styles from './NavigateButton.module.scss';
import { useNavigate } from 'react-router-dom';

function NavigateButton({ text, url }: { url: string; text: string }) {
  const navigate = useNavigate();
  return (
    <button className={styles.button} onClick={() => navigate(url)}>
      {text}
    </button>
  );
}

export default NavigateButton;
