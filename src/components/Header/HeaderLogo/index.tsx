import style from './HeaderLogo.module.scss';
import logoImg from 'assets/images/graphql.svg';
import { useNavigate } from 'react-router-dom';

export const HeaderLogo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div draggable={false} className={style.wrapper} onClick={() => navigate('/')}>
      <img draggable={false} className={style.logo_img} src={logoImg} alt="graphql" />
      <p className={style.logo}>Graphiql</p>
    </div>
  );
};
