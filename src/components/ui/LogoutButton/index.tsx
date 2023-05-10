import styles from './LogoutButton.module.scss';
import { getAuth } from 'firebase/auth';

function LogoutButton() {
  const logout = () => {
    const auth = getAuth();
    auth.signOut();
  };
  return (
    <button className={styles.button} onClick={logout}>
      Logout
    </button>
  );
}

export default LogoutButton;
