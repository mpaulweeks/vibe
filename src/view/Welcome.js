import React from 'react';

import {
  Row,
  SubRow,
  Button,
  SectionHeader,
  Message,
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
    const { brain } = this.props;
    const { isPlaying } = this.state;

    const visuApp = brain.visuType && brain.visuApp();
    const instructions = visuApp ? visuApp.instructions : [];

    // todo check if coming from bitly
    console.log(brain.startingUrlData);
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
              {brain.types.map((t, i) => !t.hide && (
                <OptionButton key={`welcome-type-${i}`}
                  label={t.name}
                  value={t.type}
                  isFocused={t.type === brain.visuType}
                  callback={value => this.setType(value)}
                />
              ))}
            </OptionRow>
          </SubRow>
          <SectionHeader>
            instructions
          </SectionHeader>
          { instructions.map((m, mi) => (
            <Message key={`instructions-${mi}`}>
              {m}
            </Message>
          ))}
        </Row>

        {!brain.isMobile && (
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

        {brain.isMobile ? (
          <Row>
            Tap and hold to switch visualizations
            <br/>
            Note: open on desktop for more options
          </Row>
        ) : (
          <Row>
            scroll down for more options
          </Row>
        )}
        <Row>
          <Button onClick={() => this.onSubmit()}>
            OK
          </Button>
        </Row>
      </ModalContainer>
    )
  }
}
