import styles from './LogoutButton.module.scss';
import { getAuth } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

function LogoutButton() {
  const { t } = useTranslation();
  const auth = getAuth();
  return (
    <button className={styles.button} onClick={() => auth.signOut()}>
      {t(`buttons.logout`)}
    </button>
  );
}

export default LogoutButton;
