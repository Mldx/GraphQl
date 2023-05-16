import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

const editorOptions: monacoEditor.editor.IStandaloneEditorConstructionOptions = {
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

export default editorOptions;
