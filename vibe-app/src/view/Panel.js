import React from 'react';

import RainbowSettings from './RainbowSettings';
import CubeSettings from './CubeSettings';

import {
  Row,
} from './Component';

class Panel extends React.Component {
  componentDidMount() {
    const { brain } = this.props;
    brain.setCallback(() => {
      this.forceUpdate()
    });
  }
  onFullscreen() {
    const { brain } = this.props;
    brain.ch.goFullScreen();
  }
  setType(type) {
    const { brain } = this.props;
    brain.setType(type);
    this.forceUpdate();
  }
  render() {
    const { brain } = this.props;
    return (
      <div>
        <Row>
          <button onClick={() => this.setType('rainbow')}>
            Rainbow
          </button>
          <button onClick={() => this.setType('cube')}>
            Cube
          </button>
        </Row>
        <Row>
          <button onClick={() => this.onFullscreen()}>
            View Fullscreen
          </button>
        </Row>
        <Row>
          {brain.visuType === 'rainbow' && (
            <RainbowSettings brain={ brain }></RainbowSettings>
          )}
          {brain.visuType === 'cube' && (
            <CubeSettings brain={ brain }></CubeSettings>
          )}
        </Row>
      </div>
    );
  }
}

export default Panel;
