import React, { useState } from 'react';
import Tabs from '../../Tabs/Tabs';
import { TabItem } from '../../Tabs/Tabs';
import styles from './EditorPage.module.scss';

const Editor: React.FC = () => {
  const defaultTabs: TabItem[] = [
    {
      tabId: crypto.randomUUID(),
      label: `New Tab`,
      query: 'query',
      answer: 'answer',
    },
  ];
  const [selectedTabId, setSelectedTabId] = useState(defaultTabs[0].tabId);
  const [tabs, setTabs] = useState(defaultTabs);

  const addTab = () => {
    const newTab = {
      tabId: crypto.randomUUID(),
      label: `New Tab`,
      query: `query`,
      answer: `answer`,
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

  const onChangeQuery = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    event.preventDefault();
    setTabs((tabs) =>
      tabs.map((tab) => {
        if (tab.tabId === selectedTabId) {
          return { ...tab, query: event.target.value };
        } else {
          return tab;
        }
      })
    );
  };

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
        <textarea
          className={styles.editor_query}
          onChange={(event) => onChangeQuery(event)}
          defaultValue={tabs[selectedIndex].query}
        />
        <div className={styles.editor_answer} />
      </div>
    </div>
  );
};

export default Editor;
