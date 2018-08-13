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
  width: 300px;
  transform: translate(-50%, 0%);

  text-align: center;
  font-size: 16px;
  cursor: none;
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

class Mobile extends React.Component {
  render() {
    return (
      <div>
        <div>
          TAP AND DRAG TO INTERACT
        </div>
        <div>
          HOLD IN PLACE FOR 3 SECONDS TO SWITCH APPS
        </div>
        <div>
          OPEN ON DESKTOP FOR MORE OPTIONS
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
          MOVE YOUR MOUSE
          <br/>
          CLICK ANYWHERE
          <br/>
          SEE WHAT HAPPENS
        </div>
        <div>
          SCROLL DOWN FOR MORE
        </div>
      </div>
    );
  }
}

export default class Welcome extends React.Component {
  render() {
    const { isMobile, startingUrlData } = this.props.brain;
    console.log(startingUrlData);
    return (
      <WelcomeContainer innerRef={e => this.elm = e}>
        <div>
          WELCOME TO
          <PopupTitle>
            <span role="img" aria-label="Rainbow">🌈</span>
            VIBE
            <span role="img" aria-label="Rainbow">🌈</span>
          </PopupTitle>
        </div>
        {isMobile ? (
          <Mobile />
        ) : (
          <Desktop />
        )}
        <Row>
          <Button onClick={this.props.exitWelcome}>
            ENTER
          </Button>
        </Row>
      </WelcomeContainer>
    )
  }
}
