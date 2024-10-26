import { CatchError } from '@/components';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { App } from './App';
import './i18n';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={CatchError}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
