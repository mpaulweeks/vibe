import React from 'react';

import Jukebox from './Jukebox';

import {
  Row,
} from './Component';

class Footer extends React.Component {
  render() {
    const childrenProps = this.props;
    return (
      <div>
        <Row>
          <Jukebox {...childrenProps}></Jukebox>
        </Row>
        <Row>
          <a href="https://twitter.com/mpaulweeks">@mpaulweeks</a>
        </Row>
      </div>
    );
  }
}

export default Footer;
