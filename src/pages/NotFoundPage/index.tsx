import style from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <img className={style.img} src="/404.png" alt="" />
    </div>
  );
};
