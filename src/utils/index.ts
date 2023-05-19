import { baseURL } from 'constants/index';
import { QueryItem, Variables } from 'types/index';

export const getStartQuery = (): QueryItem => ({
  id: crypto.randomUUID(),
  query: {
    tabName: 'New Tab',
    value: '',
  },
  answer: {
    value: '',
  },
  variables: {
    tabName: 'Variables',
    value: '',
  },
  selectedVarsOrHeadersTab: 'variables',
  headers: {
    tabName: 'Headers',
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
