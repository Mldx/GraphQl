import { useEffect, useState } from 'react';
import { IntrospectionQuery, buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql';

export function useGetSchema() {
  const [schema, setSchema] = useState<undefined | string>();
  const [error, setError] = useState('');

  const fetchSchema = async () => {
    try {
      setError('');
      const response = await fetch('https://rickandmortyapi.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      });

      const jsonData = await response.json();
      if (jsonData.errors) {
        throw new Error(jsonData.errors[0].message);
      }

      const result = printSchema(buildClientSchema(jsonData.data as IntrospectionQuery));
      setSchema(result);
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchSchema();
  });

  return { schema, error };
}
