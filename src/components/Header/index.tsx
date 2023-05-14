import style from './Header.module.scss';
import { Navbar } from './Navbar';
import { HeaderLogo } from './HeaderLogo';
import { HeaderBtns } from './HeaderBtns';
import { useStickyHeader } from 'hooks/index';

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
