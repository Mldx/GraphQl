import { IDeveloper } from 'types';
import style from './Developer.module.scss';
import { useTranslation } from 'react-i18next';

export const Developer = (props: IDeveloper) => {
  const { t } = useTranslation();
  return (
    <div className={style.card_info}>
      <div className={style.dev_main}>
        <img className={style.developer_img} src={props.photo} alt="" />
        <div>
          <div className={style.contacts}>
            <h2 className={style.name}>{t(props.name)}</h2>
            <a
              className={style.developer_link}
              href={props.gitHub}
              target="_blank"
              rel="noreferrer"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  d="M10 0.247559C4.475 0.247559 0 4.72506 0 10.2476C0 14.6667 2.865 18.4142 6.8375 19.7351C7.3375 19.8292 7.52083 19.5201 7.52083 19.2542C7.52083 19.0167 7.5125 18.3876 7.50833 17.5542C4.72667 18.1576 4.14 16.2126 4.14 16.2126C3.685 15.0584 3.0275 14.7501 3.0275 14.7501C2.12167 14.1301 3.0975 14.1426 3.0975 14.1426C4.10167 14.2126 4.62917 15.1726 4.62917 15.1726C5.52083 16.7017 6.97 16.2601 7.54167 16.0042C7.63167 15.3576 7.88917 14.9167 8.175 14.6667C5.95417 14.4167 3.62 13.5567 3.62 9.72506C3.62 8.63339 4.0075 7.74173 4.64917 7.04173C4.53667 6.78923 4.19917 5.77256 4.73667 4.39506C4.73667 4.39506 5.57417 4.12673 7.48667 5.42006C8.28667 5.19756 9.13667 5.08756 9.98667 5.08256C10.8367 5.08756 11.6867 5.19756 12.4867 5.42006C14.3867 4.12673 15.2242 4.39506 15.2242 4.39506C15.7617 5.77256 15.4242 6.78923 15.3242 7.04173C15.9617 7.74173 16.3492 8.63339 16.3492 9.72506C16.3492 13.5667 14.0117 14.4126 11.7867 14.6584C12.1367 14.9584 12.4617 15.5717 12.4617 16.5084C12.4617 17.8467 12.4492 18.9217 12.4492 19.2467C12.4492 19.5092 12.6242 19.8217 13.1367 19.7217C17.1375 18.4101 20 14.6601 20 10.2476C20 4.72506 15.5225 0.247559 10 0.247559Z"
                  fill="#8ee100"
                />
              </svg>
            </a>
          </div>
          <div className="position">{t(props.position)}</div>
          <ul>
            {props.tasks.map((el: string, index) => (
              <li className={style.task} key={index}>
                {t(el)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p>{t(props.description)}</p>
    </div>
  );
};
