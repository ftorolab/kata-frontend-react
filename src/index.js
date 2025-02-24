import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";

import {
  applyPolyfills,
  defineCustomElements,
} from "@npm-bbta/bbog-dig-dt-webcomponents-lib/loader";


const container = document.getElementById('root');
const root = createRoot(container);

// root.render(
// <React.StrictMode>
//   <App />
// </React.StrictMode>);

root.render(
  <App />
);

applyPolyfills().then(() => {
  defineCustomElements();
});
