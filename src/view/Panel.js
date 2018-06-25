import React from 'react';

import CustomSettings from './CustomSettings';

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
    brain.goFullScreen();
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
          {brain.types.map((t, i) => !t.hide && (
            <Button key={`type-${i}`} onClick={() => this.setType(t.type)}>
              {t.name}
            </Button>
          ))}
          <Button onClick={() => this.onFullscreen()}>
            View Fullscreen
          </Button>
        </Row>
        <Row>
          <CustomSettings brain={ brain }></CustomSettings>
        </Row>
      </div>
    );
  }
}

export default Panel;
