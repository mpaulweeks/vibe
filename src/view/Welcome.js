import React from 'react';

import {
  Row,
  SubRow,
  Button,
  SectionHeader,
  Message,
  ModalContainerOuter,
  ModalContainerInner,
  ModalCornerExit,
  ModalTitle,
} from './Common';
import {
  OptionRow,
  OptionButton,
} from './Option';

export default class Welcome extends React.Component {
  componentDidMount() {
    const { brain } = this.props;
    brain.addCallback(() => {
      this.forceUpdate();
    });
  }
  setPlay(isPlaying) {
    const { audio } = this.props;
    audio.setPlay(isPlaying);
  }
  setType(type) {
    const { brain } = this.props;
    brain.setType(type);
  }
  onScrollClick(event) {
    event.preventDefault();
    this.props.scrollToFooter();
  }
  onSubmit() {
    this.props.exitWelcome();
  }
  render() {
    const { audio, brain } = this.props;

    const visuApp = brain.visuType && brain.visuApp();
    const instructions = visuApp ? visuApp.instructions : [];

    // todo check if coming from bitly
    console.log(brain.startingUrlData);
    return (
      <ModalContainerOuter innerRef={e => this.elm = e}>
        <ModalContainerInner>
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
                  isFocused={audio.isPlaying}
                />
                <OptionButton
                  label={'No'}
                  value={false}
                  callback={value => this.setPlay(value)}
                  isFocused={!audio.isPlaying}
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
              <a
                href=""
                onClick={e => this.onScrollClick(e)}
              >
                scroll down for more options
              </a>
            </Row>
          )}
          <ModalCornerExit onClick={() => this.onSubmit()}>
            X
          </ModalCornerExit>
        </ModalContainerInner>
      </ModalContainerOuter>
    )
  }
}
