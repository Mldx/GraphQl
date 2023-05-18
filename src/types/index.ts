export interface IDeveloper {
  id: string;
  name: string;
  photo: string;
  gitHub: string;
  description: string;
  tasks: string[];
}

export interface TabItem {
  tabName?: string;
  value: string;
}

export interface QueryItem {
  id: string;
  query: TabItem;
  answer: TabItem;
  variables: TabItem;
  selectedVarsOrHeadersTab: 'variables' | 'headers';
  headers: TabItem;
}

export interface Variables {
  page: string;
}
