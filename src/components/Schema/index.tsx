import { useEffect, useState, lazy, Suspense } from 'react';
import CustomButton from 'components/CustomButton';
import classnames from 'classnames';
import styles from './Schema.module.scss';
import { GraphQLSchema } from 'graphql';
import { sdlRequest } from 'utils/schemaQuery.ts';
import { buildClientSchema } from 'graphql/index';

const LazySchemaContent = lazy(() => import('components/Schema1/SchemaContent'));

const Schema = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [error, setError] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSchema();
  }, []);

  const fetchSchema = () => {
    sdlRequest()
      .then(({ data }) => {
        const schema = buildClientSchema(data);
        setSchema(schema);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
      });
  };

  const reFetchSchema = () => {
    setSchema(null);
    setError(null);
    setIsLoading(true);
    fetchSchema();
  };

  return (
    <>
      <div
        className={classnames(styles.schema, {
          [styles.schema__active]: isOpen,
        })}
      >
        <CustomButton
          disabled={isLoading}
          title={'Re-fetch GraphQL schema'}
          className={classnames(styles.schema_btn, styles.schema_reloadBtn)}
          onClick={reFetchSchema}
        >
          ↻
        </CustomButton>
        <CustomButton
          title={`${isOpen ? 'Hide' : 'Show'} Documentation Explorer`}
          disabled={!schema}
          className={classnames(styles.schema_btn, styles.schema_schemeBtn)}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={classnames(styles.stateCircle, {
              [styles.stateCircle_error]: error,
              [styles.stateCircle_loading]: isLoading,
              [styles.stateCircle_sucsess]: !!schema,
            })}
          ></span>
          <span className={styles.schema_btn_text}>Schema</span>
        </CustomButton>
        {schema && (
          <Suspense fallback={<div>Loading...</div>}>
            <LazySchemaContent schema={schema} />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default Schema;
