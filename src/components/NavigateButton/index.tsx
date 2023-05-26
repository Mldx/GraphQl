import styles from './NavigateButton.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NavigateButton({ text, url }: { url: string; text: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <button className={styles.button} onClick={() => navigate(url)}>
      {t(`buttons.${text}`)}
    </button>
  );
}

export default NavigateButton;
