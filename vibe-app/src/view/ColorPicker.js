/*
Largely adapted using example from react-color
https://casesandberg.github.io/react-color/#examples
*/

import React from 'react'
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'

class ColorPicker extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      displayColorPicker: false,
      hex: this.props.hex,
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.props.callback(color.hex);
    this.setState({ hex: color.hex })
  };

  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `${this.state.hex}`,
          margin: '0 0',
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <ChromePicker color={ this.state.hex } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default ColorPicker
