import LoginForm from '../../ui/Forms/LoginForm';
import styles from './LoginPage.module.scss';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className={styles.login_page_wrapper}>
      <LoginForm />
      <div>
        You don&apos;t have an account, <Link to="/signup">create an account</Link>
      </div>
    </div>
  );
}

export default LoginPage;
