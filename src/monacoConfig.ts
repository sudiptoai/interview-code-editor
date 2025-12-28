import { loader } from '@monaco-editor/react';

// Configure Monaco to use local files instead of CDN
// Only import monaco-editor if not in test environment
if (process.env.NODE_ENV !== 'test') {
  import('monaco-editor').then((monaco) => {
    loader.config({ monaco: monaco.default || monaco });
  });
}

