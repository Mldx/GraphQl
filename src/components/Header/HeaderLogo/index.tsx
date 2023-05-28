import style from './HeaderLogo.module.scss';
import logoImg from 'assets/images/graphql.svg';
import { Link } from 'react-router-dom';

export const HeaderLogo: React.FC = () => {
  return (
    <Link draggable={false} className={style.wrapper} to={'/'}>
      <img draggable={false} className={style.logo_img} src={logoImg} alt="graphql" />
      <p className={style.logo}>Graphiql</p>
    </Link>
  );
};
