import { editorOptions } from 'constants/monacoSettings';
import Monaco from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import CustomButton from 'components/CustomButton';
import styles from './Variables.module.scss';
import { useEffect, useRef, useState } from 'react';

type VariablesProps = {
  isOpen: boolean;
  children?: React.ReactNode;
  editorContent: string | undefined;
  onChangeQuery: (value: string | undefined) => void;
  setIsOpen: (isOpen: boolean) => void;
};

const Variables = ({
  children,
  editorContent,
  isOpen,
  setIsOpen,
  onChangeQuery,
}: VariablesProps) => {
  const [value, setValue] = useState('');

  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
  const btnSign = isOpen ? '∨' : '∧';

  const handleEditorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (editorRef.current) {
      setValue(editorContent as string);
    }
  }, [editorContent]);

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue) {
      onChangeQuery(newValue);
    }
  };

  return (
    <div className={styles.variables}>
      <CustomButton className={styles.variables_btn} onClick={() => setIsOpen(!isOpen)}>
        {btnSign}
      </CustomButton>
      {children}
      {isOpen && (
        <div className={styles.variables_editor}>
          <Monaco
            height="100%"
            defaultLanguage="javascript"
            defaultValue={editorContent}
            value={value}
            onMount={handleEditorDidMount}
            onChange={handleEditorChange}
            options={editorOptions}
          />
        </div>
      )}
    </div>
  );
};

export default Variables;
