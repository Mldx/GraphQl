export interface IScreenInitialData {
  name: string;
  field: { name: string; type: string };
  description: string;
}

export const SCREEN_INITIAL_DATA: IScreenInitialData = {
  name: 'Docs',
  field: { name: 'query', type: 'Query' },
  description: 'A GraphQL schema provides a root type for each kind of operation.',
};
