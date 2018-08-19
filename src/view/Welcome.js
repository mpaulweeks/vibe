import React from 'react';
import styled from 'styled-components';

import {
  Row,
  SubRow,
  Button,
  ModalContainer,
  ModalTitle,
} from './Common';

const TypeRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
`;

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: props.audio.isPlaying,
    };
  }
  togglePlay() {
    this.setState({
      isPlaying: !this.state.isPlaying,
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
            <TypeRow>
              {types.map((t, i) => !t.hide && (
                <div key={`welcome-type-${i}`}>
                  <Button
                    onClick={() => this.setType(t.type)}
                    highlight={visuType === t.type}
                  >
                    {t.name}
                  </Button>
                </div>
              ))}
            </TypeRow>
          </SubRow>
        </Row>

        {!isMobile && (
          <Row>
            Play music?
            <Button
              onClick={() => this.togglePlay()}
              highlight={isPlaying}
            >
              Yes
            </Button>
            <Button
              onClick={() => this.togglePlay()}
              highlight={!isPlaying}
            >
              No
            </Button>
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
            Enter
          </Button>
        </Row>
      </ModalContainer>
    )
  }
}
