import React from 'react';
import styled from 'styled-components';

import {
  Row,
  Button,
} from './Component';

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

class Mobile extends React.Component {
  render() {
    console.log('rendering mobile welcome')
    return (
      <div>
        <div>
          Tap and drag to interact
        </div>
        <div>
          Tap and hold to switch apps
        </div>
        <div>
          Open on desktop for more options
        </div>
      </div>
    );
  }
}

class Desktop extends React.Component {
  render() {
    return (
      <div>
        <div>
          Move your mouse
          <br/>
          Click anywhere
          <br/>
          See what happens
        </div>
        <div>
          Scroll down for more
        </div>
      </div>
    );
  }
}

export default class Welcome extends React.Component {
  setType(type) {
    const { brain } = this.props;
    brain.setType(type);
  }
  render() {
    const { isMobile, startingUrlData, types } = this.props.brain;
    console.log(startingUrlData);
    return (
      <WelcomeContainer innerRef={e => this.elm = e}>
        <div>
          Welcome to
          <PopupTitle>
            <span role="img" aria-label="Rainbow">🌈</span>
            VIBE
            <span role="img" aria-label="Rainbow">🌈</span>
          </PopupTitle>
        </div>
        <div>
          Choose a visualization
          <TypeRow>
            {types.map((t, i) => !t.hide && (
              <div key={`welcome-type-${i}`}>
                <Button onClick={() => this.setType(t.type)}>
                  {t.name}
                </Button>
              </div>
            ))}
          </TypeRow>
        </div>

        {isMobile ? (
          <Mobile />
        ) : (
          <Desktop />
        )}
        <Row>
          <Button onClick={this.props.exitWelcome}>
            Enter
          </Button>
        </Row>
      </WelcomeContainer>
    )
  }
}
