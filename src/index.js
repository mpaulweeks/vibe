import React from 'react'; // for jsx
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import { withCookies, CookiesProvider } from 'react-cookie';

const render = app => {
  const CookieApp = withCookies(app);
  ReactDOM.render(
    <CookiesProvider>
      <CookieApp />
    </CookiesProvider>,
    document.getElementById('root')
  );
}
render(App);
