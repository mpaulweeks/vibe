import React from 'react';

import RainbowSettings from './RainbowSettings';
import CubeSettings from './CubeSettings';

import {
  Row,
  SectionHeader,
  Button,
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
          <SectionHeader>
            change display
          </SectionHeader>
          <Button onClick={() => this.setType('rainbow')}>
            Rainbow
          </Button>
          <Button onClick={() => this.setType('cube')}>
            Cube
          </Button>
          <Button onClick={() => this.onFullscreen()}>
            View Fullscreen
          </Button>
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
