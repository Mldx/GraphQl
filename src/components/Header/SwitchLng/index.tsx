import styles from './SwitchLng.module.scss';
import { changeLanguage } from 'i18next';

function SwitchLng() {
  return (
    <div className={styles.switchLng}>
      <label className={styles.label} onClick={() => changeLanguage('en')}>
        <input name="switchLng" type="radio" defaultChecked />
        <span>EN</span>
      </label>
      /
      <label className={styles.label} onClick={() => changeLanguage('ru')}>
        <input name="switchLng" type="radio" />
        <span>RU</span>
      </label>
    </div>
  );
}

export default SwitchLng;
