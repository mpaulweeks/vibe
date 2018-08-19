import React from 'react';
import styled, { keyframes } from 'styled-components';

import {
  Row,
  SectionHeader,
  Message,
  ModalContainer,
  ModalTitle,
} from './Common';

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

const PopupContainer = styled(ModalContainer)`
  animation-name: ${disappear};
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-delay: 3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`;

export default class Popup extends React.Component {
  render() {
    const { brain } = this.props;
    const visuApp = brain.visuType && brain.visuApp();
    const title = brain.visuName();
    const instructions = visuApp ? visuApp.instructions : [];
    return (
      <PopupContainer innerRef={e => this.elm = e}>
        <Row>
          <ModalTitle>
            {title}
          </ModalTitle>
        </Row>

        <Row>
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
            scroll down for more options
          </Row>
        )}
      </PopupContainer>
    )
  }
}
