import React, { useEffect, useState } from 'react';
import {
  buildClientSchema,
  GraphQLField,
  GraphQLInputField,
  GraphQLInputObjectType,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
} from 'graphql';

import { IScreenInitialData, SCREEN_INITIAL_DATA } from 'constants/schemaScreenInitialData.ts';
import ScreenWithType from 'components/Schema1/SchemaContent/ScreenWithType';
import ScreenWithField from 'components/Schema1/SchemaContent/ScreenWithField';
import { sdlRequest } from 'utils/schemaQuery.ts';
import ScreenInitial from 'components/Schema1/SchemaContent/ScreenInitial';

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
      | IScreenInitialData
      | undefined
      | null
    >
  >([null]);

  useEffect(() => {
    sdlRequest()
      .then(({ data }) => {
        const schema = buildClientSchema(data);
        setSchema(schema);
        console.log(schema);
        setCurType(schema.getQueryType());
        setCurScreen([SCREEN_INITIAL_DATA, SCREEN_INITIAL_DATA]);
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

  if (schema && curScreen.length <= 2) {
    return <ScreenInitial onClickType={handleClickType} />;
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
