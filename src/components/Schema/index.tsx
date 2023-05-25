import React, { useEffect, useState } from 'react';
import CustomButton from 'components/CustomButton';
import classnames from 'classnames';
import styles from './Schema.module.scss';
import SchemaContent from 'components/Schema1/SchemaContent';
import { GraphQLSchema } from 'graphql';
import { sdlRequest } from 'utils/schemaQuery.ts';
import { buildClientSchema } from 'graphql/index';

const Schema = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    sdlRequest()
      .then(({ data }) => {
        const schema = buildClientSchema(data);
        setSchema(schema);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <>
      <div
        className={classnames(styles.schema, {
          [styles.schema__active]: isOpen,
        })}
      >
        <CustomButton
          disabled={!schema}
          className={classnames(styles.schema_btn, {
            [styles.schema_btn__active]: isOpen,
          })}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={classnames(styles.stateCircle, {
              [styles.stateCircle_error]: error && !schema,
              [styles.stateCircle_loading]: !error && !schema,
              [styles.stateCircle_sucsess]: !!schema,
            })}
          ></span>
          Schema
        </CustomButton>
        {schema && <SchemaContent schema={schema} />}
      </div>
    </>
  );
};

export default Schema;
