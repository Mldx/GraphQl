import React from 'react';
import CustomButton from 'components/CustomButton';
import classnames from 'classnames';
import styles from './Schema.module.scss';
import { useTranslation } from 'react-i18next';

type SchemaProps = {
  children?: React.ReactNode;
};

const Schema = ({ children }: SchemaProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <>
      <CustomButton
        className={classnames(styles.schema_btn, {
          [styles.schema_btn__active]: isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        {t('editor.schema')}
      </CustomButton>
      {isOpen && <div className={styles.schema}>{children}</div>}
    </>
  );
};

export default Schema;
