import styles from './LoginPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import LoginForm from 'components/forms/LoginForm';

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        navigate('/main');
      }
    });

    return unsubscribe;
  }, [navigate]);

  if (loading) {
    return null;
  }

  return (
    <div className={styles.login_page_wrapper}>
      <LoginForm />
      <div>
        You don&apos;t have an account,&nbsp;
        <Link to="/signup" className={styles.link}>
          create an account
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
