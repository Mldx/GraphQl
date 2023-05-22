import { useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useGetSchema } from '../../hooks/get-schema';

export const Schema = () => {
  const [schemaGet, setSchemaGet] = useState<undefined | string>();
  const [schemaDoc, setSchemaDoc] = useState<undefined | string>();
  const { schema } = useGetSchema();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!schema) {
      setLoading(true);
      return;
    } else {
      setLoading(false);
      setSchemaGet(schema);
    }
  }, [schema]);

  function handlerClickDocs() {
    setSchemaDoc(schemaGet);
  }
  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && schema && (
        <>
          <button onClick={handlerClickDocs}>Show Docs</button>
          <CodeEditor
            readOnly={true}
            value={schemaDoc}
            language="graphql"
            placeholder=""
            padding={15}
            style={{
              fontSize: 14,
            }}
          />
        </>
      )}
    </>
  );
};
