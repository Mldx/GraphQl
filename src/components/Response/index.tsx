import { useRef } from 'react';
import Monaco from '@monaco-editor/react';
import classnames from 'classnames';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import { editorOptionsNoEdit } from 'constants/monacoSettings';
import Schema from 'components/Schema';
import styles from './Response.module.scss';
import { handleEditorDidMount } from 'utils/editor';
import { useTranslation } from 'react-i18next';

interface ResponseProps {
  responseData: object | null;
}

const Response = ({ responseData }: ResponseProps) => {
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
  const formattedData = JSON.stringify(responseData, null, 2);
  const { t } = useTranslation();

  return (
    <div className={styles.response}>
      <div
        className={classnames(styles.response_container, {
          [styles.response_container__active]: responseData,
        })}
      >
        {responseData ? (
          <Monaco
            defaultLanguage="typescript"
            onMount={handleEditorDidMount(editorRef)}
            value={formattedData}
            options={editorOptionsNoEdit}
          />
        ) : (
          <div>{t('editor.responsePlaceholder')}</div>
        )}
      </div>
      <Schema>{t('editor.schema')}</Schema>
    </div>
  );
};

export default Response;
