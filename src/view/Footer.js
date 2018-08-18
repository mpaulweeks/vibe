import React from 'react';

import Jukebox from './Jukebox';

import {
  Row,
  AuthorFootnote,
  CookieFootnote,
} from './Common';

class Footer extends React.Component {
  render() {
    const childrenProps = this.props;
    return (
      <div>
        <Row>
          <Jukebox {...childrenProps}></Jukebox>
        </Row>
        <Row>
          <AuthorFootnote>
            created by <a href="https://twitter.com/mpaulweeks">@mpaulweeks</a>
          </AuthorFootnote>
          <CookieFootnote>
            this site uses cookies to remember your music preferences for future visits
          </CookieFootnote>
        </Row>
      </div>
    );
  }
}

export default Footer;
