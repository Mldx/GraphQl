import style from './style.module.scss';
import { Navbar } from './navbar';
import { BtnsGroup } from './headerBtns';
import { Logo } from './logoGroup';
import { useLayoutEffect, useState } from 'react';

export const Header: React.FC = () => {
  const sticky = useStickyHeader(1);

  return (
    <header className={`${sticky ? `${style.sticky}` : `${style.header}`}`}>
      <div className={style.wrapper}>
        <Logo />
        <Navbar />
        <BtnsGroup />
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
