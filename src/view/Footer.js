import React from 'react';

import Jukebox from './Jukebox';

import {
  AuthorFootnote,
  CookieFootnote,
  Row,
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
            <br/>
            this information is only saved in your browser and not collected in any way
            <br/>
            last updated: 2023-11-06
          </CookieFootnote>
        </Row>
      </div>
    );
  }
}

export default Footer;
