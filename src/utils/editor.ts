import { baseURL } from 'constants/index';
import { FieldName, QueryItem, Variables } from 'types/index';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

export const getStartQuery = (): QueryItem => ({
  id: crypto.randomUUID(),
  query: {
    tabName: 'tab',
    value: '',
  },
  answer: {
    value: '',
  },
  variables: {
    tabName: 'variables',
    value: '',
  },
  selectedVarsOrHeadersTab: 'variables',
  headers: {
    tabName: 'headers',
    value: '',
  },
});

export const makeRequest = (query: string): Promise<object> => {
  return fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }).then((res) => res.json());
};

export const parseQuery = (query: string, variables: Variables): string => {
  const signature = query.slice(0, query.indexOf('{') + 1);
  const queryWithoutSignature = query.slice(signature.length);
  const queryWithoutVariables = signature.replace(
    /\([^\(\)]*\$[a-zA-Z0-9_]+:\s*[a-zA-Z0-9_]+\s*[^\(\)]*\)/g,
    ''
  );
  let parsedQuery = queryWithoutSignature;
  for (const key in variables) {
    if (variables.hasOwnProperty(key)) {
      const value = variables[key as keyof Variables];
      parsedQuery = parsedQuery.replace(
        new RegExp(`\\$${key}`, 'g'),
        JSON.stringify(value).replace(/"([^"]+)":/g, '$1:')
      );
    }
  }
  return queryWithoutVariables + parsedQuery;
};

export const handleEditorDidMount = (
  editorRef: React.MutableRefObject<monacoEditor.editor.IStandaloneCodeEditor | null>
) => {
  return (
    editor: monacoEditor.editor.IStandaloneCodeEditor,
    monaco: typeof import('monaco-editor')
  ) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
      noSuggestionDiagnostics: true,
    });
    editorRef.current = editor;
  };
};

export const getIndex = (array: QueryItem[], id: string) =>
  array.findIndex((item) => item.id === id);

export const updateQueryField = (
  queries: QueryItem[],
  field: FieldName,
  value: string,
  id: string
) => {
  return queries.map((query) => {
    if (query.id === id) {
      const newQuery = { ...query };
      newQuery[field] = { ...newQuery[field], value };
      return newQuery;
    } else {
      return query;
    }
  });
};
