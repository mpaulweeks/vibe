/*
Largely adapted using example from react-color
https://casesandberg.github.io/react-color/#examples
*/

import React from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';

const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Swatch = styled.div`
  padding: 1px;
  background: #fff;
  border-radius: 1px;
  display: inline-block;
  cursor: pointer;
`;

const ColorChoice = styled.div`
  width: 36px;
  height: 14px;
  border-radius: 2px;
  background-color: ${props => props.color};
  margin: 0 0;
`;

const PopOver = styled.div`
  position: absolute;
  z-index: 2;
`;

const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;


class ColorPicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      displayColorPicker: false,
      color: this.props.value,
    };
  }
  componentWillReceiveProps(props){
    this.setState({ color: props.value });
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };
  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };
  handleChange = (color) => {
    this.props.onChange(color.hex);
    this.setState({ color: color.hex })
  };

  render() {
    const { color, displayColorPicker } = this.state;
    return (
      <ColorPickerContainer>
        <Swatch onClick={ this.handleClick }>
          <ColorChoice color={color}></ColorChoice>
        </Swatch>
        {displayColorPicker && (
          <PopOver>
            <Cover onClick={ this.handleClose }></Cover>
            <ChromePicker color={color} onChange={ this.handleChange } />
          </PopOver>
        )}
      </ColorPickerContainer>
    )
  }
}

export default ColorPicker
