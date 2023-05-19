import { useEffect, useState } from 'react';

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

// Отправляем запрос с помощью fetch

function Sch() {
  const [data, setData] = useState<object | null>(null);
  const [error, setError] = useState(null);
  const [currentLink, setCurrentLink] = useState('Characters');

  useEffect(() => {
    fetch(serverUrl, options)
      .then((response) => response.json())
      .then((data) => {
        const schemaSDL = JSON.stringify(data, null, 2);
        const dataObj = JSON.parse(schemaSDL);
        console.log(dataObj.data.__schema);
        setData(dataObj.data.__schema);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <>
      <div>{error}</div>
      {data && (
        <>
          <div>{`type: ${currentLink}`}</div>
          <br />
          <div>
            {data.types
              .find((value: object) => value.name.toLowerCase() === currentLink.toLowerCase())
              .fields?.map((v: string) => (
                <p key={v.name}>{v.name}</p>
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default Sch;
