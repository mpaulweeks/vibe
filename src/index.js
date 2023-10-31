import React from 'react'; // for jsx
import { createRoot } from 'react-dom/client';
import './index.css';

import { CookiesProvider, withCookies } from 'react-cookie';
import App from './App';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
const CookieApp = withCookies(App);
root.render(
  <CookiesProvider>
    <CookieApp />
  </CookiesProvider>
);
