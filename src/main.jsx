import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { Replay } from "@sentry/replay";
import App from './App.jsx';
import './index.css';

Sentry.init({
  dsn: "https://e2c20c247374beb067073866a8ffc10d@o4508451752640512.ingest.us.sentry.io/4508451755589632",
  integrations: [
    Sentry.browserTracingIntegration({
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={({ error }) => <div>An error occurred: {error.message}</div>}>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);