import styles from './SwitchLng.module.scss';
import { changeLanguage } from 'i18next';
import { useState } from 'react';

function SwitchLng() {
  const [lng, setLng] = useState(localStorage.getItem('i18nextLng'));
  return (
    <div className={styles.switchLng}>
      <label className={styles.label} onClick={() => changeLanguage('en')}>
        <input
          name="switchLng"
          type="radio"
          onChange={() => setLng('en')}
          checked={lng === ('en' || null)}
        />
        <span>EN</span>
      </label>
      /
      <label className={styles.label} onClick={() => changeLanguage('ru')}>
        <input name="switchLng" type="radio" onChange={() => setLng('ru')} checked={lng === 'ru'} />
        <span>RU</span>
      </label>
    </div>
  );
}

export default SwitchLng;
