import styles from '../Sch.module.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import {
  GraphQLField,
  GraphQLInputField,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLArgument,
  GraphQLType,
} from 'graphql';

interface ISchemaType {
  value: GraphQLType;
  onClickType: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onClickField: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onClickBack: () => void;
  currentScreen: Array<
    | GraphQLObjectType
    | GraphQLNamedType
    | GraphQLField<string, string>
    | GraphQLInputField
    | undefined
    | null
  >;
}

function ScreenWithType(props: ISchemaType) {
  const { value, currentScreen, onClickType, onClickField, onClickBack } = props;
  console.log(value);
  const fields = 'getFields' in value ? Object.values(value.getFields()) : [];
  return (
    <div className={styles.main_container}>
      {currentScreen.length > 2 && (
        <div className={styles.backMenu} onClick={onClickBack}>
          {'<' + currentScreen[currentScreen.length - 2]?.name}
        </div>
      )}
      <div className={styles.name}>{'name' in value && value?.name}</div>
      {fields.map((field, index) => (
        <div key={index}>
          <div>
            <Link to="" onClick={(e) => onClickField(e)}>
              {field.name}
            </Link>
            {'args' in field && !!field.args.length && (
              <>
                (
                <span>
                  {field.args.map((arg: GraphQLArgument, argIndex: number) => (
                    <div key={argIndex} className={styles.arg}>
                      <span>
                        <span>{arg.name}</span>:
                        <Link to="" onClick={(e) => onClickType(e)}>
                          {` ${arg.type.toString()}`}
                        </Link>
                      </span>
                    </div>
                  ))}
                </span>
                )
              </>
            )}
            :
            <Link to="" onClick={(e) => onClickType(e)}>
              {` ${field.type.toString()}`}
            </Link>
          </div>
          <div className={styles.desc}>
            <p>{field.description}</p>
          </div>
        </div>
      ))}
      {'description' in value && value.description && (
        <div>{value.description.replaceAll('`', '')}</div>
      )}
    </div>
  );
}

export default ScreenWithType;
