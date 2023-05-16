import React, { useCallback, useMemo, useRef, useState } from 'react';
import Tabs from 'components/Tabs';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import Monaco from '@monaco-editor/react';
import CustomButton from 'components/CustomButton';
import Variables from 'components/Variables';
import editorOptions from 'constants/monacoSettings';
import { QueryItem } from 'types/index';
import { getStartQuery } from 'utils/index';
import styles from './EditorPage.module.scss';
import Schema from 'components/Schema';

type FieldName = 'query' | 'variables' | 'headers';

const defaultQuery: QueryItem[] = [getStartQuery()];

const EditorPage: React.FC = () => {
  const [selectedQueryId, setSelectedQueryId] = useState(defaultQuery[0].id);
  const [queries, setQueries] = useState(defaultQuery);
  const [isVarsAndHeadersOpen, setIsVarsAndHeadersOpen] = useState(false);

  const selectedQueryIndex = queries.findIndex((tab) => tab.id === selectedQueryId);
  const addTab = useCallback(() => {
    const newQuery = getStartQuery();
    setQueries((currQueries) => [...currQueries, newQuery]);
    setSelectedQueryId(newQuery.id);
  }, []);

  const changeTab = (id: string, tabName: string) => {
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
  };

  const deleteTab = (queryIdToDelete: string) => {
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
  };

  const onChangeQuery = (value: string | undefined, field: FieldName): void => {
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
  };

  const showValue = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getValue());
    }
  };

  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const currentTabs = useMemo(
    () => [
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
    ],
    [queries, selectedQueryIndex]
  );

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
            height="100%"
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
        <div className={styles.editor_answer}>
          <Schema>Schema</Schema>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
