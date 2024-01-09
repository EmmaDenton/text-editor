import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      // Ensure the data is a string
      const editorValue = (typeof data === 'string') ? data : (localData || header);
      this.editor.setValue(editorValue);
    }).catch((error) => {
      console.error('Error loading data from IndexedDB:', error);
      // Use localData or header as a fallback
      this.editor.setValue(localData || header);
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(this.editor.getValue());
    });
  }
}
