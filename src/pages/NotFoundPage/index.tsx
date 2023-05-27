import style from './NotFoundPage.module.scss';
import notFoundImg from 'assets/images/404.webp';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <img className={style.img} src={notFoundImg} alt="" />
    </div>
  );
};
