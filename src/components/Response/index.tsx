import { useRef } from 'react';
import Monaco from '@monaco-editor/react';
import classnames from 'classnames';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import { editorOptionsNoEdit } from 'constants/monacoSettings';
import Schema from 'components/Schema';
import styles from './Response.module.scss';

const Response = ({ responseData }) => {
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };
  const formattedData = JSON.stringify(responseData, null, 2);

  return (
    <div className={styles.response}>
      <div
        className={classnames(styles.response_container, {
          [styles.response_container__active]: responseData,
        })}
      >
        {responseData ? (
          <Monaco
            defaultLanguage="javascript"
            onMount={handleEditorDidMount}
            value={formattedData}
            options={editorOptionsNoEdit}
          />
        ) : (
          'Click the "query" button to get a response here'
        )}
      </div>
      <Schema>Schema</Schema>
    </div>
  );
};

export default Response;
