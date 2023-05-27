import { getIntrospectionQuery } from 'graphql';
import { baseURL } from 'constants/index.ts';

export const sdlRequest = () => {
  return fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  }).then((res) => res.json());
};
