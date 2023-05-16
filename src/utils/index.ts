import { QueryItem } from 'types/index';

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
