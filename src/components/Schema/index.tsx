import { useEffect, useState, lazy, Suspense } from 'react';
import CustomButton from 'components/CustomButton';
import classnames from 'classnames';
import styles from './Schema.module.scss';
import { useTranslation } from 'react-i18next';
import { GraphQLSchema } from 'graphql';
import { sdlRequest } from 'utils/schemaQuery.ts';
import { buildClientSchema } from 'graphql/index';

const LazySchemaExplorer = lazy(() => import('components/Schema/SchemaExplorer'));

const Schema = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [error, setError] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

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

  const generateTitleForSchemaBnt = () => {
    return `${
      isOpen
        ? t<string>('editor.schema_btn_tittle_p1.hide')
        : t<string>('editor.schema_btn_tittle_p1.show')
    } ${t<string>('editor.schema_btn_tittle_p2')}`;
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
          title={t<string>('editor.reload_btn_tittle')}
          className={classnames(styles.schema_btn, styles.schema_reloadBtn)}
          onClick={reFetchSchema}
        >
          ↻
        </CustomButton>
        <CustomButton
          title={generateTitleForSchemaBnt()}
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
          <span className={styles.schema_btn_text}>{t('editor.schema')}</span>
        </CustomButton>
        {schema && (
          <Suspense fallback={null}>
            <LazySchemaExplorer schema={schema} />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default Schema;
