import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

export const editorOptions: monacoEditor.editor.IStandaloneEditorConstructionOptions = {
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
};

export const editorOptionsNoEdit = Object.assign({}, editorOptions, {
  readOnly: true,
  dragAndDrop: false,
  lineNumbers: 'off',
});
