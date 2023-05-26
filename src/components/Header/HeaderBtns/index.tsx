import style from './HeaderBtns.module.scss';
import NavigateButton from 'components/NavigateButton';
import LogoutButton from 'components/LogoutButton';
import { useLocation } from 'react-router-dom';

export const HeaderBtns: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const location = useLocation();
  return (
    <div className={style.btns_wrapper}>
      {isLogin ? (
        <>
          {location.pathname != '/main' && <NavigateButton text="main" url="/main" />}
          <LogoutButton />
        </>
      ) : (
        <>
          <NavigateButton text="signin" url="/login" />
          <NavigateButton text="signup" url="/signup" />
        </>
      )}
    </div>
  );
};
