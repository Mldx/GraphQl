import React, { useState } from 'react';
import {
  GraphQLField,
  GraphQLInputObjectType,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
} from 'graphql';

import { SCREEN_INITIAL_DATA } from 'constants/schemaScreenInitialData.ts';
import ScreenWithType from 'components/Schema/SchemaExplorer/ScreenWithType';
import ScreenWithField from 'components/Schema/SchemaExplorer/ScreenWithField';
import ScreenInitial from 'components/Schema/SchemaExplorer/ScreenInitial';
import styles from 'components/Schema/SchemaExplorer/SchemaExplorer.module.scss';
import { screenHistoryType } from 'types';

interface ISchemaContent {
  schema: GraphQLSchema;
}

function SchemaExplorer({ schema }: ISchemaContent) {
  const [currentType, setCurrentType] = useState<
    GraphQLObjectType | GraphQLNamedType | null | undefined
  >(schema.getQueryType());
  const [screenHistory, setScreenHistory] = useState<Array<screenHistoryType>>([
    SCREEN_INITIAL_DATA,
    SCREEN_INITIAL_DATA,
  ]);

  try {
    const handleClickType = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const text = e.currentTarget.text.replace(/[^a-zA-Z]/g, '');
      setCurrentType(schema.getType(text));
      setScreenHistory([...screenHistory, schema.getType(text)]);
    };
    const handleClickField = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const text = e.currentTarget.text;
      if (
        currentType instanceof GraphQLObjectType ||
        currentType instanceof GraphQLInputObjectType
      ) {
        setScreenHistory([...screenHistory, currentType.getFields()[text]]);
      }
    };
    const handleClickBack = () => {
      if (screenHistory.length > 2) {
        const lastScreen = screenHistory[screenHistory.length - 2];
        lastScreen && lastScreen.name && setCurrentType(schema.getType(lastScreen.name));
      }
      setScreenHistory(screenHistory.slice(0, -1));
    };

    const currentScreen = screenHistory[screenHistory.length - 1];

    if (schema && screenHistory.length <= 2) {
      return <ScreenInitial onClickType={handleClickType} />;
    }

    if (
      currentScreen instanceof GraphQLObjectType ||
      currentScreen instanceof GraphQLInputObjectType ||
      currentScreen instanceof GraphQLScalarType
    ) {
      return (
        <ScreenWithType
          value={currentScreen}
          onClickType={handleClickType}
          onClickField={handleClickField}
          onClickBack={handleClickBack}
          currentScreen={screenHistory}
        />
      );
    }

    return (
      <ScreenWithField
        value={currentScreen as GraphQLField<string, string>}
        onClickType={handleClickType}
        onClickBack={handleClickBack}
        currentScreen={screenHistory}
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

export default SchemaExplorer;
