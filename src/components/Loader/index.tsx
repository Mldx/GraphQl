import React from 'react';

import classnames from 'classnames';

import styles from './Loader.module.scss';

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ loading, size, className }) => (
  <>
    {loading !== false && (
      <div
        className={classnames(size ? styles.size : styles[LoaderSize.m], className, styles.loader)}
      />
    )}
  </>
);

export default Loader;
