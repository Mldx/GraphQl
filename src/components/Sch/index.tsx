import React, { useEffect, useState } from 'react';
import {
  GraphQLSchema,
  buildClientSchema,
  GraphQLObjectType,
  GraphQLNamedType,
  GraphQLInputObjectType,
  GraphQLScalarType,
} from 'graphql';
import { Link } from 'react-router-dom';
import styles from './Sch.module.scss';

const serverUrl = 'https://rickandmortyapi.com/graphql';
const sdlQuery = `
    query IntrospectionQuery {
      __schema {
        
        queryType { name }
        mutationType { name }
        subscriptionType { name }
        types {
          ...FullType
        }
        directives {
          name
          description
          
          locations
          args {
            ...InputValue
          }
        }
      }
    }

    fragment FullType on __Type {
      kind
      name
      description
      
      fields(includeDeprecated: true) {
        name
        description
        args {
          ...InputValue
        }
        type {
          ...TypeRef
        }
        isDeprecated
        deprecationReason
      }
      inputFields {
        ...InputValue
      }
      interfaces {
        ...TypeRef
      }
      enumValues(includeDeprecated: true) {
        name
        description
        isDeprecated
        deprecationReason
      }
      possibleTypes {
        ...TypeRef
      }
    }

    fragment InputValue on __InputValue {
      name
      description
      type { ...TypeRef }
      defaultValue
      
      
    }

    fragment TypeRef on __Type {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  
`;
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: sdlQuery }),
};

function Sch() {
  const [error, setError] = useState(null);
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [curType, setCurType] = useState<GraphQLObjectType | GraphQLNamedType | null | undefined>(
    null
  );

  useEffect(() => {
    fetch(serverUrl, options)
      .then((response) => response.json())
      .then((data) => {
        const schema = buildClientSchema(data.data);
        setSchema(schema);
        setCurType(schema.getQueryType());
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
    console.log(text);
    setCurType(schema.getType(text));
    console.log(schema.getType(text));
  };
  const handleClickField = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const text = e.currentTarget.text;
    console.log(text);
    if (curType instanceof GraphQLObjectType || curType instanceof GraphQLInputObjectType) {
      console.log(curType.getFields()[text]);
    }
  };

  if (curType instanceof GraphQLObjectType) {
    const fields = curType ? Object.values(curType.getFields()) : [];
    return (
      <div className={styles.main_container}>
        <div>{curType?.name}</div>
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
                            {arg.type.toString()}
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

  if (curType instanceof GraphQLInputObjectType) {
    const fields = curType ? Object.values(curType.getFields()) : [];
    return (
      <div className={styles.main_container}>
        <div>{curType?.name}</div>
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

  if (curType instanceof GraphQLScalarType) {
    return (
      <div className={styles.main_container}>
        <div>{curType?.name}</div>
        <div className={styles.desc}>
          <p>{curType.description && curType.description.replaceAll('`', '')}</p>
        </div>
      </div>
    );
  }
  return <></>;
}

export default Sch;
