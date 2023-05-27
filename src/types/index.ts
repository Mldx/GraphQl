import { GraphQLField, GraphQLInputField, GraphQLNamedType, GraphQLObjectType } from 'graphql';
export interface IDeveloper {
  id: string;
  name: string;
  position: string;
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

export type FieldName = 'query' | 'variables' | 'headers' | 'answer';

export type screenHistoryType =
  | GraphQLObjectType
  | GraphQLNamedType
  | GraphQLField<string, string>
  | GraphQLInputField
  | IScreenInitialData
  | undefined;

export interface IScreenInitialData {
  name: string;
  field: { name: string; type: string };
  description: string;
}
