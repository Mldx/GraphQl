import style from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <a className={style.GHLink} href="https://rs.school/" target="_blank" rel="noreferrer">
        <img className={style.rsschool_link} src="rsschool.svg" alt="rsschool" />
      </a>
      <ul className={style.gitHubList}>
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
      <div className={style.schoolLink}>
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
  );
};
