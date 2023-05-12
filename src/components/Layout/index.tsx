import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import style from './Layout.module.scss';

export const Layout: React.FC = () => (
  <div className={style.layoutWrap}>
    <Header />
    <main className={style.main}>
      <Outlet />
    </main>
    <footer className={style.footer}>
      <Footer />
    </footer>
  </div>
);
