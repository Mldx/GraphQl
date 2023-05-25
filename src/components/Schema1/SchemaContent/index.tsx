import React, { useState } from 'react';
import {
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
import ScreenInitial from 'components/Schema1/SchemaContent/ScreenInitial';
import styles from 'components/Schema1/SchemaContent/SchemaContent.module.scss';

interface ISchemaContent {
  schema: GraphQLSchema;
}

function SchemaContent({ schema }: ISchemaContent) {
  const [curType, setCurType] = useState<GraphQLObjectType | GraphQLNamedType | null | undefined>(
    schema.getQueryType()
  );
  const [curScreen, setCurScreen] = useState<
    Array<
      | GraphQLObjectType
      | GraphQLNamedType
      | GraphQLField<string, string>
      | GraphQLInputField
      | IScreenInitialData
      | undefined
    >
  >([SCREEN_INITIAL_DATA, SCREEN_INITIAL_DATA]);

  try {
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

    return (
      <ScreenWithField
        value={curScr as GraphQLField<string, string>}
        onClickType={handleClickType}
        onClickBack={handleClickBack}
        currentScreen={curScreen}
      />
    );
  } catch (e) {
    return (
      <div className={styles.main_container}>
        <div className={styles.err}> Ops, something went wrong</div>
      </div>
    );
  }
}

export default SchemaContent;
