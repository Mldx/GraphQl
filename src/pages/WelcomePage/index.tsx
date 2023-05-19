import style from './WelcomePage.module.scss';
import { Developer } from 'components/Developer';
import { developers } from 'utils/developer';
import { IDeveloper } from 'types';
import { useTranslation } from 'react-i18next';

export const WelcomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={style.welcome_page}>
      <div className={style.welcome_page_wrap}>
        <div className={style.title_wrap}>
          <h1 className={style.title_main}>GraphiQL</h1>
          <p className={style.title}> {t('welcomePage.description')}</p>
        </div>
        <div className={style.dev_container}>
          {developers.map((el: IDeveloper) => (
            <Developer key={el.id} {...el} />
          ))}
        </div>
      </div>
    </div>
  );
};
