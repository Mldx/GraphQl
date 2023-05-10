import style from './style.module.scss';

export const HeaderLogo: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <img className={style.logo_img} src="graphql.svg" alt="graphql" />
      <p className={style.logo}>Graphiql</p>
    </div>
  );
};
