import style from './Header.module.scss';
import { HeaderLogo } from './HeaderLogo';
import { useEffect, useLayoutEffect, useState } from 'react';
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
        <SwitchLng />
        {!loading && <HeaderBtns isLogin={!!currentUser} />}
      </div>
    </header>
  );
};

function useStickyHeader(offset = 0) {
  const [stick, setStick] = useState(false);

  const handleScroll = () => {
    setStick(window.scrollY > offset);
  };

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return stick;
}
