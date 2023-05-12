import style from './HeaderBtns.module.scss';
import NavigateButton from 'components/NavigateButton';
import LogoutButton from 'components/LogoutButton';

export const HeaderBtns: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  return (
    <div className={style.btnsWrapper}>
      {isLogin ? (
        <>
          <NavigateButton text="go to main page" url="/main" />
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
