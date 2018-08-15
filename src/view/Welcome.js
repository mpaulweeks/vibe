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
`;

class Mobile extends React.Component {
  render() {
    console.log('rendering mobile welcome')
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
          WELCOME TO
          <PopupTitle>
            <span role="img" aria-label="Rainbow">🌈</span>
            VIBE
            <span role="img" aria-label="Rainbow">🌈</span>
          </PopupTitle>
        </div>
        <div>
          CHOOSE A VISUALIZATION
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
            ENTER
          </Button>
        </Row>
      </WelcomeContainer>
    )
  }
}
