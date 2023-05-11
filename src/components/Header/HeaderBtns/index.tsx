import style from './HeaderBtns.module.scss';
import NavigateButton from '../../NavigateButton';
import LogoutButton from '../../LogoutButton';

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
