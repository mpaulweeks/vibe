import React from 'react';

import {
  Row,
  SubRow,
  Button,
  ModalContainer,
  ModalTitle,
} from './Common';
import {
  OptionRow,
  OptionButton,
} from './Option';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: props.audio.isPlaying,
    };
  }
  setPlay(isPlaying) {
    this.setState({
      isPlaying: isPlaying,
    });
  }
  setType(type) {
    const { brain } = this.props;
    brain.setType(type);
    this.forceUpdate();
  }
  onSubmit() {
    this.props.exitWelcome(this.state.isPlaying);
  }
  render() {
    const { isMobile, startingUrlData, types, visuType } = this.props.brain;
    const { isPlaying } = this.state;

    // todo check if coming from bitly
    console.log(startingUrlData);
    return (
      <ModalContainer innerRef={e => this.elm = e}>
        <Row>
          Welcome to
          <ModalTitle>
            <span role="img" aria-label="Rainbow">🌈</span>
            &nbsp;VIBE&nbsp;
            <span role="img" aria-label="Rainbow">🌈</span>
          </ModalTitle>
        </Row>
        <Row>
          <SubRow>Choose a visualization to start</SubRow>
          <SubRow>
            <OptionRow>
              {types.map((t, i) => !t.hide && (
                <OptionButton key={`welcome-type-${i}`}
                  label={t.name}
                  value={t.type}
                  isFocused={t.type === visuType}
                  callback={value => this.setType(value)}
                />
              ))}
            </OptionRow>
          </SubRow>
        </Row>

        {!isMobile && (
          <Row>
            <SubRow>Play music?</SubRow>
            <OptionRow width='50%'>
              <OptionButton
                label={'Yes'}
                value={true}
                callback={value => this.setPlay(value)}
                isFocused={isPlaying}
              />
              <OptionButton
                label={'No'}
                value={false}
                callback={value => this.setPlay(value)}
                isFocused={!isPlaying}
              />
            </OptionRow>
          </Row>
        )}

        {isMobile && (
          <Row>
            Tap and drag to interact
            <br/>
            Tap and hold to switch visualizations
            <br/>
            Note: open on desktop for more options
          </Row>
        )}
        <Row>
          <Button onClick={() => this.onSubmit()}>
            enter
          </Button>
        </Row>
      </ModalContainer>
    )
  }
}
