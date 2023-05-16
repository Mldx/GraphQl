import style from './WelcomePage.module.scss';
import { Developer } from 'components/Developer';
import { developers } from 'utils/developer';
import { IDeveloper } from 'types';
import { useTranslation } from 'react-i18next';

export const WelcomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={style.dev_page}>
      <div className={style.title_wrap}>
        <p className={style.title}>{t('welcomePage.tittle_part1')}</p>
        <p className={style.title}>{t('welcomePage.tittle_part2')}</p>
      </div>
      <div className={style.dev_container}>
        {developers.map((el: IDeveloper) => (
          <Developer key={el.id} {...el} />
        ))}
      </div>
    </div>
  );
};
