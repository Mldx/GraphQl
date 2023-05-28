import style from './WelcomePage.module.scss';
import { Developer } from 'components/Developer';
import { developers } from 'utils/developer.ts';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import bgImage from 'assets/images/bg-welcome.png';

export const WelcomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={style.welcome_page}>
      <div className={style.welcome_page_wrap}>
        <div className={style.welcome_title_wrap}>
          <div className={style.title}>
            <h1 className={style.title_main}>GraphiQL</h1>
            <p className={style.title_text}>{t('welcomePage.description')}</p>
          </div>
          <img className={style.bg_img__welcome} src={bgImage} draggable={false} alt="alt" />
        </div>
        <div className={style.gallery}>
          <div className={classNames(style.gallery_left, style.gallery_side)}>
            <Developer {...developers[0]} />
            <p className={classNames(style.gallery_description, style.gallery__item)}>
              {t(developers[1].description)}
            </p>
            <Developer {...developers[2]} />
          </div>
          <div className={classNames(style.gallery_right, style.gallery_side)}>
            <p className={classNames(style.gallery_description, style.gallery__item)}>
              {t(developers[0].description)}
            </p>
            <Developer {...developers[1]} />
            <p className={classNames(style.gallery_description, style.gallery__item)}>
              {t(developers[2].description)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
