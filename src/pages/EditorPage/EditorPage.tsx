import React, { useState, useRef } from 'react';
import Index from '../../components/Tabs';
import { TabItem } from '../../components/Tabs';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import Monaco from '@monaco-editor/react';
import styles from './EditorPage.module.scss';
import Button from '../../components/Button/Button';

const Editor: React.FC = () => {
  const defaultTabs: TabItem[] = [
    {
      tabId: crypto.randomUUID(),
      label: 'New Tab',
      query: 'query',
      answer: 'answer',
    },
  ];
  const [selectedTabId, setSelectedTabId] = useState(defaultTabs[0].tabId);
  const [tabs, setTabs] = useState(defaultTabs);

  const addTab = () => {
    const newTab = {
      tabId: crypto.randomUUID(),
      label: 'New Tab',
      query: 'query',
      answer: 'answer',
    };
    setTabs((tabs) => [...tabs, newTab]);
  };

  const changeTab = (id: string) => {
    setSelectedTabId(id);
  };

  const selectedIndex = tabs.findIndex((tab) => tab.tabId === selectedTabId);

  const deleteTab = (tabIdToDelete: string) => {
    const filteredTabs = tabs.filter((tab) => tab.tabId !== tabIdToDelete);
    if (filteredTabs.length > 0) {
      setTabs(filteredTabs);
      setSelectedTabId((currentTabId) => {
        if (currentTabId === tabIdToDelete) {
          return filteredTabs[filteredTabs.length - 1].tabId;
        }
        return currentTabId;
      });
    } else {
      setTabs(defaultTabs);
      setSelectedTabId(() => defaultTabs[0].tabId);
    }
  };

  const onChangeQuery = (value: string | undefined): void => {
    if (value) {
      setTabs((tabs) =>
        tabs.map((tab) => {
          if (tab.tabId === selectedTabId) {
            return { ...tab, query: value };
          } else {
            return tab;
          }
        })
      );
    }
  };

  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const showValue = () => {
    if (editorRef.current !== null) {
      console.log(editorRef.current.getValue());
    }
  };

  return (
    <div className={styles.editor}>
      <Index
        tabs={tabs}
        selectedTabId={selectedTabId}
        onClickTab={(id: string) => {
          changeTab(id);
        }}
        onClickTabAdd={addTab}
        onClickTabDelete={deleteTab}
      />
      <div key={tabs[selectedIndex].tabId} className={styles.editor_inner}>
        <Monaco
          height="100%"
          defaultLanguage="javascript"
          defaultValue={tabs[selectedIndex].query}
          onMount={handleEditorDidMount}
          onChange={(value) => onChangeQuery(value)}
          options={{
            minimap: {
              enabled: false,
            },
            scrollbar: {
              vertical: 'hidden',
              horizontal: 'hidden',
            },
            renderLineHighlight: 'none',
            contextmenu: false,
            overviewRulerBorder: false,
            tabSize: 2,
            quickSuggestions: false,
          }}
        />
        <div className={styles.control}>
          <Button onClick={showValue} className={styles.control_btn}>
            query
          </Button>
        </div>
        <div className={styles.editor_answer} />
      </div>
    </div>
  );
};

export default Editor;
