import styles from './SignupPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import RegisterForm from 'components/forms/RegisterForm';

function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        navigate('/');
      }
    });

    return unsubscribe;
  }, [navigate]);

  if (loading) {
    return null;
  }

  return (
    <div className={styles.signup_page_wrapper}>
      <RegisterForm />
      <div>
        Already have an account? <Link to="/login">login</Link>
      </div>
    </div>
  );
}

export default SignupPage;
