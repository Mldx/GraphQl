import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import style from './Layout.module.scss';
import { Footer } from '../Footer';

export const Layout: React.FC = () => (
  <div className={style.layout_wrap}>
    <Header />
    <main className={style.main}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
