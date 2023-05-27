import style from './Footer.module.scss';
import rssLogo from 'assets/images/rsschool.svg';

export const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className={style.wrapper}>
        <a className={style.GHLink} href="https://rs.school/" target="_blank" rel="noreferrer">
          <img className={style.rsschool_link} src={rssLogo} alt="rsschool" />
        </a>
        <ul className={style.gitHub_list}>
          <li>
            <a
              className={style.GHLink}
              href="https://github.com/Mldx"
              target="_blank"
              rel="noreferrer"
            >
              @mldx
            </a>
          </li>
          <li>
            <a
              className={style.GHLink}
              href="https://github.com/KazakovMaksim"
              target="_blank"
              rel="noreferrer"
            >
              @kazakovmaksim
            </a>
          </li>
          <li>
            <a
              className={style.GHLink}
              href="https://github.com/YuliaEnik"
              target="_blank"
              rel="noreferrer"
            >
              @YuliaEnik
            </a>
          </li>
        </ul>
        <div className={style.school_link}>
          <a
            className={style.GHLink}
            href="https://rs.school/react/"
            target="_blank"
            rel="noreferrer"
          >
            REACT
          </a>
          <p>2023</p>
        </div>
      </div>
    </footer>
  );
};
