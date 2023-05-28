import styles from './SignupPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import RegisterForm from 'components/forms/RegisterForm';
import { useTranslation } from 'react-i18next';

function SignupPage() {
  const { t } = useTranslation();
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
    <div className={styles.signup_page_wrapper}>
      <RegisterForm />
      <div>
        {t('signupPage.description_part1')}
        <Link to="/login" className={styles.link}>
          {t('signupPage.description_part2')}
        </Link>
      </div>
    </div>
  );
}

export default SignupPage;
