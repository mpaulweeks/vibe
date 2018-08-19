import React from 'react';
import styled from 'styled-components';

import {
  Row,
  Button,
} from './Common';

const WelcomeContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  width: calc(100% - 20px);
  max-width: 400px;
  transform: translate(-50%, 0%);

  text-align: center;
  font-size: 16px;
  cursor: default;
  background-color: #000000;
  border: 3px solid #FFFFFF;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;

  & div {
    padding: 5px 0px;
  }
`;

const PopupTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const TypeRow = styled.div`
  display: flex;
  justify-content: space-around;
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
    console.log(visuType);
    const { isPlaying } = this.state;

    // todo check if coming from bitly
    console.log(startingUrlData);
    return (
      <WelcomeContainer innerRef={e => this.elm = e}>
        <Row>
          Welcome to
          <PopupTitle>
            <span role="img" aria-label="Rainbow">🌈</span>
            &nbsp;VIBE&nbsp;
            <span role="img" aria-label="Rainbow">🌈</span>
          </PopupTitle>
        </Row>
        <Row>
          Choose a visualization
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
        </Row>

        {!isMobile && (
          <Row>
            Play music?
            <input type="checkbox" checked={isPlaying} onChange={() => this.togglePlay()} />
          </Row>
        )}

        {isMobile ? (
          <Row>
            Tap and drag to interact
            <br/>
            Tap and hold to switch apps
          </Row>
        ) : (
          <Row>
            Move your mouse
            <br/>
            Click anywhere
            <br/>
            See what happens
          </Row>
        )}
        <Row>
          <Button onClick={() => this.onSubmit()}>
            Enter
          </Button>
        </Row>
        {isMobile && (
          <Row>
            Note: open on desktop for more options
          </Row>
        )}
      </WelcomeContainer>
    )
  }
}
