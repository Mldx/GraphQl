import React from 'react';

import classnames from 'classnames';

import styles from './CustomButton.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton = ({ children, disabled, className, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={classnames(className, styles.button, { button_disabled: disabled === true })}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
