import React from 'react';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  cursor: none;
  height: 100%;
  overflow: hidden;
`;

const CanvasElm = styled.canvas`
  height: 100%;
`;

class Canvas extends React.Component {
  elm = React.createRef();
  render() {
    return (
      <CanvasContainer>
        <CanvasElm ref={this.elm}></CanvasElm>
      </CanvasContainer>
    );
  }
}

export default Canvas;
