import { Outlet } from 'react-router-dom';
import { Header } from './../header';
import style from './style.module.scss';
import { Footer } from './../footer';

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
