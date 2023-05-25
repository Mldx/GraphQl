import styles from '../SchemaContent.module.scss';
import { Link } from 'react-router-dom';
import React from 'react';

interface IScreenInitialProps {
  onClickType: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function ScreenInitial(props: IScreenInitialProps) {
  const { onClickType } = props;
  const ScreenInitialData = {
    name: 'Docs',
    field: { name: 'query', type: 'Query' },
    description: 'A GraphQL schema provides a root type for each kind of operation.',
  };
  return (
    <>
      <div className={styles.name}>{ScreenInitialData.name}</div>
      <div>{ScreenInitialData.description}</div>
      <div>
        <div className={styles.field}>
          <div className={styles.fieldNameRoot}>{ScreenInitialData.field.name}</div>
          :&nbsp;
          <Link className={styles.typeName} to="" onClick={(e) => onClickType(e)}>
            {ScreenInitialData.field.type}
          </Link>
        </div>
      </div>
    </>
  );
}

export default ScreenInitial;
