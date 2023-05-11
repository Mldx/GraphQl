import style from './Header.module.scss';
import { Navbar } from './Navbar';
import { HeaderLogo } from './HeaderLogo';
import { useEffect, useLayoutEffect, useState } from 'react';
import { HeaderBtns } from './HeaderBtns';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

export const Header: React.FC = () => {
  const sticky = useStickyHeader(1);

  const [currentUser, setCurrentUser] = useState<null | User>(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setCurrentUser(user) : setCurrentUser(null);
    });

    return unsubscribe;
  }, []);

  return (
    <header className={`${sticky ? `${style.sticky}` : `${style.header}`}`}>
      <div className={style.wrapper}>
        <HeaderLogo />
        <Navbar />
        <HeaderBtns isLogin={!!currentUser} />
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
