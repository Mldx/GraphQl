import { useEffect, useRef, useState } from 'react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import Monaco from '@monaco-editor/react';
import styles from './EditorPage.module.scss';
import Tabs, { TabItem } from 'components/Tabs';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import CustomButton from 'components/CustomButton';

const EditorPage: React.FC = () => {
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

  if (loading) {
    return null;
  }

  return (
    <div className={styles.editor}>
      <Tabs
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
          <CustomButton onClick={showValue} className={styles.control_btn}>
            query
          </CustomButton>
        </div>
        <div className={styles.editor_answer} />
      </div>
    </div>
  );
};

export default EditorPage;
