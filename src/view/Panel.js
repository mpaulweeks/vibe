import React from 'react';

import CustomSettings from './CustomSettings';

import {
  Row,
  SubRow,
  SectionHeader,
  Button,
} from './Common';
import {
  OptionRow,
  OptionButton,
} from './Option';

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
          <Button onClick={() => this.onFullscreen()}>
            view fullscreen
          </Button>
        </Row>
        <Row>
          <SectionHeader>
            change display
          </SectionHeader>
          <OptionRow width='400px'>
            {brain.types.map((t, i) => !t.hide && (
              <OptionButton key={`type-${i}`}
                label={t.name}
                value={t.type}
                isFocused={t.type === brain.visuType}
                callback={value => this.setType(value)}
              />
            ))}
          </OptionRow>
        </Row>
        <Row>
          <CustomSettings brain={ brain }></CustomSettings>
        </Row>
      </div>
    );
  }
}

export default Panel;
