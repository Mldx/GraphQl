import styles from './LogoutButton.module.scss';
import { getAuth } from 'firebase/auth';

function LogoutButton() {
  const auth = getAuth();
  return (
    <button className={styles.button} onClick={() => auth.signOut()}>
      logout
    </button>
  );
}

export default LogoutButton;
