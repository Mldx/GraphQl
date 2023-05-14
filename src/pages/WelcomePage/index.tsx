import style from './WelcomePage.module.scss';
import { Developer } from 'components/Developer';
import { developers } from 'utils/developer';
import { IDeveloper } from 'types';

export const WelcomePage: React.FC = () => (
  <div className={style.dev_page}>
    <div className={style.dev_page_wrap}>
      <div className={style.title_wrap}>
        <h1 className={style.title_main}>GraphiQL</h1>
        <p className={style.title}>
          the GraphQL integrated development environment (IDE). It’s a powerful (and all-around
          awesome) tool you’ll use often while building Gatsby websites. It offers syntax
          highlighting, intellisense autocompletion, automatic documentation, and much more.
        </p>
      </div>
      <div className={style.dev_container}>
        {developers.map((el: IDeveloper) => (
          <Developer key={el.id} {...el} />
        ))}
      </div>
    </div>
  </div>
);
