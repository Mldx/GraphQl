import style from './Header.module.scss';
import { HeaderLogo } from './HeaderLogo';
import { useStickyHeader } from 'hooks/index';
import { useEffect, useState } from 'react';
import { HeaderBtns } from './HeaderBtns';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import SwitchLng from 'components/Header/SwitchLng';

export const Header: React.FC = () => {
  const sticky = useStickyHeader(1);
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState<null | User>(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <header className={`${sticky ? `${style.sticky}` : `${style.header}`}`}>
      <div className={style.wrapper}>
        <HeaderLogo />
        <div className={style.box1}>
          <SwitchLng />
          {!loading && <HeaderBtns isLogin={!!currentUser} />}
        </div>
      </div>
    </header>
  );
};
