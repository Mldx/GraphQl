/* eslint-disable @typescript-eslint/no-explicit-any */
import { graphql } from 'cm6-graphql';
import { useEffect, useState } from 'react';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import { GraphQLSchema } from 'graphql/type';

export const Schema = () => {
  //11111
  {/* <GraphiQL
    fetcher={async (graphQLParams: any) => {
      const data = await fetch('https://rickandmortyapi.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(graphQLParams),
        credentials: 'same-origin',
      });
      const x = data.json().catch(() => data.text());
      console.log(x);
      return x;
    }}
  />; */}
  const [myGraphQLSchema, setMyGraphQLSchema] = useState<GraphQLSchema>();
  useEffect(() => {
    //22222
    /* const makeRequest = async () => {
      return fetch('https://rickandmortyapi.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((result) => console.log(result));
    };
    makeRequest(); */
    //33333
    const fetchSchema = async () => {
      const remoteExecutor = buildHTTPExecutor({ endpoint: 'https://rickandmortyapi.com/graphql' });

      const postsSubschema = {
        schema: await schemaFromExecutor(remoteExecutor),
        executor: remoteExecutor,
      };
      const fields = postsSubschema.schema.getQueryType()?.getFields();
      const result = JSON.parse(JSON.stringify(fields));
      setMyGraphQLSchema(postsSubschema.schema);
      console.log(myGraphQLSchema);
    };
    fetchSchema();
  }, []);
};
