import style from './WelcomePage.module.scss';
import { Developer } from 'components/Developer';
import { developers } from 'utils/developer';
import { IDeveloper } from 'types';

export const WelcomePage: React.FC = () => {
  return (
    <div className={style.dev_page}>
      <div className={style.title_wrap}>
        <p className={style.title}>Welcome to our app.</p>
        <p className={style.title}>We hope you enjoy it.</p>
      </div>
      <div className={style.dev_container}>
        {developers.map((el: IDeveloper) => (
          <Developer key={el.id} {...el} />
        ))}
      </div>
    </div>
  );
};
