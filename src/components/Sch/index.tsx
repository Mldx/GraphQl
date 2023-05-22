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
import { Link } from 'react-router-dom';
import styles from './Sch.module.scss';
import { getIntrospectionQuery } from 'graphql/index';

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

  if (error) {
    return <div>{error}</div>;
  }

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
  if (curScr instanceof GraphQLObjectType) {
    const fields = Object.values(curScr.getFields());
    return (
      <div className={styles.main_container}>
        <div className={styles.backMenu} onClick={handleClickBack}>
          {curScreen.length > 2 && '<' + curScreen[curScreen.length - 2]?.name}
        </div>
        <div className={styles.name}>{curScr?.name}</div>
        {fields.map((field, index) => (
          <div key={index}>
            <div>
              <Link to="" onClick={(e) => handleClickField(e)}>
                {field.name}
              </Link>
              {!!field.args.length && (
                <>
                  (
                  <span>
                    {field.args.map((arg, argIndex) => (
                      <div key={argIndex} className={styles.arg}>
                        <span>
                          <span>{arg.name}</span>:
                          <Link to="" onClick={(e) => handleClickType(e)}>
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
              <Link to="" onClick={(e) => handleClickType(e)}>
                {` ${field.type.toString()}`}
              </Link>
            </div>
            <div className={styles.desc}>
              <p>{field.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (curScr instanceof GraphQLInputObjectType) {
    const fields = curScr ? Object.values(curScr.getFields()) : [];
    return (
      <div className={styles.main_container}>
        <div className={styles.backMenu} onClick={handleClickBack}>
          {curScreen.length > 2 && '<' + curScreen[curScreen.length - 2]?.name}
        </div>
        <div className={styles.name}>{curScr?.name}</div>
        {fields.map((field, index) => (
          <div key={index}>
            <div>
              <Link to="" onClick={(e) => handleClickField(e)}>
                {field.name}
              </Link>
              :
              <Link to="" onClick={(e) => handleClickType(e)}>
                {` ${field.type.toString()}`}
              </Link>
            </div>
            <div className={styles.desc}>
              <p>{field.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (curScr instanceof GraphQLScalarType) {
    return (
      <div className={styles.main_container}>
        <div className={styles.backMenu} onClick={handleClickBack}>
          {curScreen.length > 2 && '<' + curScreen[curScreen.length - 2]?.name}
        </div>
        <div className={styles.name}>{curScr?.name}</div>
        <div className={styles.desc}>
          <p>{curScr.description && curScr.description.replaceAll('`', '')}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.main_container}>
      <div className={styles.backMenu} onClick={handleClickBack}>
        {curScreen.length > 2 && '<' + curScreen[curScreen.length - 2]?.name}
      </div>
      <div className={styles.name}>{curScr?.name}</div>
      <div>{curScr?.description}</div>
      <div>
        Type:
        <Link to="" onClick={(e) => handleClickType(e)}>
          {curScr && 'type' in curScr && ` ${curScr.type.toString()}`}
        </Link>
      </div>
      {curScr && 'args' in curScr && !!curScr.args.length && (
        <div>
          <div>Arguments:</div>
          <span>
            {curScr.args.map((arg, argIndex) => (
              <div key={argIndex}>
                <span>
                  <span>{arg.name}</span>:
                  <Link to="" onClick={(e) => handleClickType(e)}>
                    {` ${arg.type.toString()}`}
                  </Link>
                </span>
              </div>
            ))}
          </span>
        </div>
      )}
    </div>
  );
}

export default Sch;
