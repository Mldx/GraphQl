import styles from './SignupPage.module.scss';
import { Link } from 'react-router-dom';
import RegisterForm from '../../ui/Forms/RegisterForm';

function SignupPage() {
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
