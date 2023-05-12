import style from './Header.module.scss';
import { Navbar } from './Navbar';
import { HeaderLogo } from './HeaderLogo';
import { useLayoutEffect, useState } from 'react';
import { HeaderBtns } from './HeaderBtns';

export const Header: React.FC = () => {
  const sticky = useStickyHeader(1);

  return (
    <header className={`${sticky ? `${style.sticky}` : `${style.header}`}`}>
      <div className={style.wrapper}>
        <HeaderLogo />
        <Navbar />
        <HeaderBtns />
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
