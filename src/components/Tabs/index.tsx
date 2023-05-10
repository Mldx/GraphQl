import React from 'react';
import classnames from 'classnames';
import styles from './Tabs.module.scss';

export interface TabItem {
  tabId: string;
  label?: string;
  query: string;
  answer: string;
}

export type TabsProps = {
  className?: string;
  selectedTabId: string;
  tabs: TabItem[];
  onClickTab: (id: string) => void;
  onClickTabAdd: () => void;
  onClickTabDelete: (id: string) => void;
};

const Index: React.FC<TabsProps> = ({
  className,
  selectedTabId,
  tabs,
  onClickTab,
  onClickTabAdd,
  onClickTabDelete,
}: TabsProps) => {
  return (
    <div className={classnames(styles.tabs, className)}>
      {tabs &&
        tabs.map((tab) => {
          const isSelected = tab.tabId === selectedTabId;
          return (
            <div
              key={tab.tabId}
              className={classnames(styles.tab, {
                [styles.tab__selected]: isSelected,
              })}
              onClick={() => onClickTab(tab.tabId)}
            >
              <div
                className={classnames(styles.tab_label, {
                  [styles.tab_label__selected]: isSelected,
                })}
              >
                {tab.label}
              </div>
              <span
                onClick={(e) => {
                  onClickTabDelete(tab.tabId);
                  e.stopPropagation();
                }}
              ></span>
            </div>
          );
        })}
      <div className={classnames(styles.tab, styles.tab_plus)} onClick={() => onClickTabAdd()}>
        +
      </div>
    </div>
  );
};

export default Index;
