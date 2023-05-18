import React, { useEffect, useCallback, useRef, useState } from 'react';
import Monaco from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import Tabs from 'components/Tabs';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import CustomButton from 'components/CustomButton';
import Variables from 'components/Variables';
import { editorOptions } from 'constants/monacoSettings';
import { QueryItem } from 'types/index';
import { getStartQuery, makeRequest, parseQuery } from 'utils/index';
import styles from './EditorPage.module.scss';
import Response from 'components/Response';

type FieldName = 'query' | 'variables' | 'headers';

const defaultQuery: QueryItem[] = [getStartQuery()];

const EditorPage: React.FC = () => {
  const [selectedQueryId, setSelectedQueryId] = useState(defaultQuery[0].id);
  const [queries, setQueries] = useState(defaultQuery);
  const [isVarsAndHeadersOpen, setIsVarsAndHeadersOpen] = useState(false);
  const [responseData, setResponseData] = useState('');

  const selectedQueryIndex = queries.findIndex((tab) => tab.id === selectedQueryId);
  const addTab = useCallback(() => {
    const newQuery = getStartQuery();
    setQueries((currQueries) => [...currQueries, newQuery]);
    setSelectedQueryId(newQuery.id);
  }, []);

  const changeTab = useCallback(
    (id: string, tabName: string) => {
      if (tabName === 'New Tab') {
        setSelectedQueryId(id);
      } else if (queries[selectedQueryIndex].selectedVarsOrHeadersTab !== tabName) {
        const newVarsOrHeadersTab =
          queries[selectedQueryIndex].selectedVarsOrHeadersTab === 'variables'
            ? 'headers'
            : 'variables';
        setQueries((currQueries) =>
          currQueries.map((query: QueryItem) =>
            query.id === id ? { ...query, selectedVarsOrHeadersTab: newVarsOrHeadersTab } : query
          )
        );
      }
    },
    [queries, selectedQueryIndex]
  );

  //TODO: это подписка на проверку логина и редирект если не залогинен
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (!user) {
        navigate('/');
      }
    });

    return unsubscribe;
  }, [navigate]);
  //TODO: тут заканчивается

  const deleteTab = useCallback(
    (queryIdToDelete: string) => {
      const queryIndexToDelete = queries.findIndex((query) => query.id === queryIdToDelete);
      const filteredQueries = queries.filter((query) => query.id !== queryIdToDelete);
      if (filteredQueries.length > 0) {
        const prevQueryIndex = queryIndexToDelete === 0 ? 0 : queryIndexToDelete - 1;
        setSelectedQueryId(filteredQueries[prevQueryIndex].id);
        setQueries(filteredQueries);
      } else {
        setQueries(defaultQuery);
        setSelectedQueryId(() => defaultQuery[0].id);
      }
    },
    [queries]
  );

  const onChangeQuery = useCallback(
    (value: string | undefined, field: FieldName): void => {
      if (value) {
        setQueries((queries) =>
          queries.map((query) => {
            if (query.id === selectedQueryId) {
              const newQuery = { ...query };
              newQuery[field] = { ...newQuery[field], value };
              return newQuery;
            } else {
              return query;
            }
          })
        );
      }
    },
    [selectedQueryId]
  );

  const showValue = useCallback(async () => {
    const query = queries[selectedQueryIndex].query.value;
    const variables = queries[selectedQueryIndex].variables.value;

    const resultQuery = variables ? parseQuery(query, JSON.parse(variables)) : query;
    const responseData = await makeRequest(resultQuery);
    setResponseData(responseData as string);
  }, [queries, selectedQueryIndex]);

  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const currentTabs = [
    {
      tabId: queries[selectedQueryIndex].id,
      label: queries[selectedQueryIndex].variables.tabName,
      query: queries[selectedQueryIndex].variables.value,
    },
    {
      tabId: queries[selectedQueryIndex].id,
      label: queries[selectedQueryIndex].headers.tabName,
      query: queries[selectedQueryIndex].headers.value,
    },
  ];

  const editorContent =
    queries[selectedQueryIndex].selectedVarsOrHeadersTab === 'variables'
      ? queries[selectedQueryIndex].variables.value
      : queries[selectedQueryIndex].headers.value;

  const tabs = queries.map((tab) => {
    return {
      tabId: tab.id,
      label: tab.query.tabName,
      query: tab.query.value,
      isSelected: tab.id === selectedQueryId,
    };
  });

  if (loading) {
    return null;
  }

  return (
    <div className={styles.editor}>
      <Tabs
        tabs={tabs}
        selectedTabId={selectedQueryId}
        onClickTab={(id: string) => changeTab(id, 'New Tab')}
        onClickTabAdd={addTab}
        onClickTabDelete={deleteTab}
      />
      <div key={queries[selectedQueryIndex].id} className={styles.editor_inner}>
        <div>
          <Monaco
            defaultLanguage="javascript"
            defaultValue={queries[selectedQueryIndex].query.value}
            onMount={handleEditorDidMount}
            onChange={(value) => onChangeQuery(value, 'query')}
            options={editorOptions}
          />
          <Variables
            isOpen={isVarsAndHeadersOpen}
            setIsOpen={setIsVarsAndHeadersOpen}
            editorContent={editorContent}
            onChangeQuery={(value) =>
              onChangeQuery(value, queries[selectedQueryIndex].selectedVarsOrHeadersTab)
            }
          >
            <Tabs
              tabs={currentTabs}
              selectedTabId={selectedQueryId}
              onClickTab={(id: string, tabName: string) => {
                changeTab(id, tabName.toLowerCase());
              }}
              selectedVarsOrHeadersTab={queries[selectedQueryIndex].selectedVarsOrHeadersTab}
            />
          </Variables>
        </div>
        <div className={styles.control}>
          <CustomButton onClick={showValue} className={styles.control_btn}>
            query
          </CustomButton>
        </div>
        <Response responseData={responseData}></Response>
      </div>
    </div>
  );
};

export default EditorPage;
