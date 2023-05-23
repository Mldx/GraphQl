import React, { useEffect, useState } from 'react';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLField,
  GraphQLInputField,
  GraphQLInputObjectType,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
} from 'graphql';

import ScreenWithType from 'components/Sch/ScreenWithType';
import ScreenWithField from 'components/Sch/ScreenWithField';

const serverUrl = 'https://rickandmortyapi.com/graphql';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: getIntrospectionQuery() }),
};

function Sch() {
  const [error, setError] = useState(null);
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [curType, setCurType] = useState<GraphQLObjectType | GraphQLNamedType | null | undefined>(
    null
  );
  const [curScreen, setCurScreen] = useState<
    Array<
      | GraphQLObjectType
      | GraphQLNamedType
      | GraphQLField<string, string>
      | GraphQLInputField
      | undefined
      | null
    >
  >([null]);

  useEffect(() => {
    fetch(serverUrl, options)
      .then((response) => response.json())
      .then((data) => {
        const schema = buildClientSchema(data.data);
        setSchema(schema);
        setCurType(schema.getQueryType());
        setCurScreen([schema.getQueryType(), schema.getQueryType()]);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (!schema) {
    return <div>Loading...</div>;
  }
  const handleClickType = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const text = e.currentTarget.text.replace(/[^a-zA-Z]/g, '');
    setCurType(schema.getType(text));
    setCurScreen([...curScreen, schema.getType(text)]);
  };
  const handleClickField = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const text = e.currentTarget.text;
    if (curType instanceof GraphQLObjectType || curType instanceof GraphQLInputObjectType) {
      setCurScreen([...curScreen, curType.getFields()[text]]);
    }
  };
  const handleClickBack = () => {
    if (curScreen.length > 2) {
      const lastScreen = curScreen[curScreen.length - 2];
      lastScreen && lastScreen.name && setCurType(schema.getType(lastScreen.name));
    }
    setCurScreen(curScreen.slice(0, -1));
  };

  const curScr = curScreen[curScreen.length - 1];

  if (error) {
    return <div>{error}</div>;
  }

  if (
    curScr instanceof GraphQLObjectType ||
    curScr instanceof GraphQLInputObjectType ||
    curScr instanceof GraphQLScalarType
  ) {
    return (
      <ScreenWithType
        value={curScr}
        onClickType={handleClickType}
        onClickField={handleClickField}
        onClickBack={handleClickBack}
        currentScreen={curScreen}
      />
    );
  }

  if (curScr) {
    return (
      <ScreenWithField
        value={curScr as GraphQLField<string, string>}
        onClickType={handleClickType}
        onClickBack={handleClickBack}
        currentScreen={curScreen}
      />
    );
  }
  return <>Ops, something went wrong</>;
}

export default Sch;
