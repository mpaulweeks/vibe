import React from 'react';
import styled, { keyframes } from 'styled-components';

const disappear = keyframes`
  0% {
    opacity: 1
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

const PopupContainer = styled.div`
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

  animation-name: ${disappear};
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-delay: 3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  & div {
    padding: 5px 0px;
  }
`;

const PopupTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

class Popup extends React.Component {
  render() {
    const { isMobile } = this.props.brain;
    return (
      <PopupContainer innerRef={e => this.elm = e}>
        <div>
          WELCOME TO
          <PopupTitle>
            <span role="img" aria-label="Rainbow">🌈</span>
            VIBE
            <span role="img" aria-label="Rainbow">🌈</span>
          </PopupTitle>
        </div>
        {isMobile ? (
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
        ) : (
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
        )}
      </PopupContainer>
    )
  }
}

export default Popup;
