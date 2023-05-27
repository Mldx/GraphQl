import React from 'react';
import classnames from 'classnames';
import styles from './Tabs.module.scss';

export interface TabItem {
  tabId: string;
  label?: string;
  query?: string;
}

export type TabsProps = {
  className?: string;
  selectedTabId: string;
  tabs: TabItem[];
  selectedVarsOrHeadersTab?: 'variables' | 'headers';
  onClickTab: (id: string, tabName: string) => void;
  onClickTabAdd?: () => void;
  onClickTabDelete?: (id: string) => void;
};

const Tabs: React.FC<TabsProps> = ({
  className,
  selectedVarsOrHeadersTab,
  selectedTabId,
  tabs,
  onClickTab,
  onClickTabAdd,
  onClickTabDelete,
}: TabsProps) => {
  const tabDelHandler = (event: React.MouseEvent, id: string) => {
    if (onClickTabDelete) {
      onClickTabDelete(id);
      event.stopPropagation();
    }
  };

  return (
    <div className={classnames(styles.tabs, className)}>
      {tabs &&
        tabs.map((tab) => {
          let isSelected;

          if (tab.label === 'New Tab') {
            isSelected = tab.tabId === selectedTabId;
          } else {
            isSelected = tab.label?.toLowerCase() === selectedVarsOrHeadersTab;
          }
          return (
            <div
              key={tab.label === 'New Tab' ? `query_${tab.tabId}` : `${tab.label}_${tab.tabId}`}
              className={classnames(styles.tab, {
                [styles.tab__selected]: isSelected,
              })}
              onClick={() => onClickTab(tab.tabId, tab.label as string)}
            >
              <div
                className={classnames(styles.tab_label, {
                  [styles.tab_label__selected]: isSelected,
                })}
              >
                {tab.label}
              </div>
              {tabs[0].label === 'New Tab' && (
                <span onClick={(e) => tabDelHandler(e, tab.tabId)}></span>
              )}
            </div>
          );
        })}
      {tabs && tabs[0].label === 'New Tab' && (
        <div
          className={classnames(styles.tab, styles.tab_plus)}
          onClick={() => {
            if (onClickTabAdd) return onClickTabAdd();
          }}
        >
          +
        </div>
      )}
    </div>
  );
};

export default Tabs;
