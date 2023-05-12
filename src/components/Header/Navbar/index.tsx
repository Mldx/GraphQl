import style from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className={style.nav}>
      <ul className={style.nav_list}>
        <li className={style.nav_item}>
          <NavLink className={style.link} to="/">
            Welcome
          </NavLink>
        </li>
        <li className={style.nav_item}>
          <NavLink className={style.link} to="/main">
            Main
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
