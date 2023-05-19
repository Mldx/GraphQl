/* eslint-disable @typescript-eslint/no-explicit-any */
import { graphql } from 'cm6-graphql';
import { useEffect, useState } from 'react';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import { GraphQLSchema } from 'graphql/type';

export const Schema = () => {
  const [myGraphQLSchema, setMyGraphQLSchema] = useState<GraphQLSchema>();
  useEffect(() => {
    const fetchSchema = async () => {
      const remoteExecutor = buildHTTPExecutor({ endpoint: 'https://rickandmortyapi.com/graphql' });

      const postsSubschema = {
        schema: await schemaFromExecutor(remoteExecutor),
        executor: remoteExecutor,
      };
      const fields = postsSubschema.schema.getQueryType()?.getFields();
      //const result = JSON.parse(JSON.stringify(fields));
      setMyGraphQLSchema(postsSubschema.schema);
    };
    fetchSchema();
  }, []);
  console.log(myGraphQLSchema);
  return <div> </div>;
};
