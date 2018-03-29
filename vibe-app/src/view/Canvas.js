import React from 'react';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  cursor: none;
  height: 100%;
`;

const CanvasElm = styled.canvas`
  height: 100%;
`;

class Canvas extends React.Component {
  render() {
    return (
      <CanvasContainer>
        <CanvasElm innerRef={e => this.elm = e}></CanvasElm>
      </CanvasContainer>
    );
  }
}

export default Canvas;
