import React from 'react';
import classnames from 'classnames';
import styles from './Tabs.module.scss';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const tabDelHandler = (event: React.MouseEvent, id: string) => {
    onClickTabDelete?.(id);
    event.stopPropagation();
  };

  return (
    <div className={classnames(styles.tabs, className)}>
      {tabs?.map((tab) => {
        const isQueryTab = tab.label === t('editor.tab');
        const tabCategory = tab.label === t('editor.variables') ? 'variables' : 'headers';
        const isSelected = isQueryTab
          ? tab.tabId === selectedTabId
          : selectedVarsOrHeadersTab === tabCategory;

        return (
          <div
            key={isQueryTab ? `query_${tab.tabId}` : `${tab.label}_${tab.tabId}`}
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
              {t(tab.label as string)}
            </div>
            {tabs[0].label === t('editor.tab') && (
              <span onClick={(e) => tabDelHandler(e, tab.tabId)}></span>
            )}
          </div>
        );
      })}
      {tabs?.[0].label === t('editor.tab') && (
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
