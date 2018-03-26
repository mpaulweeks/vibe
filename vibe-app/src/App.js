import React from 'react';

import Canvas from './Canvas';
import Brain from './Brain';

class App extends React.Component {
  componentDidMount() {
    this.brain = new Brain(this.refs.canvas.elm);
    window.brain = this.brain;
    console.log('mounted App', this.brain);
  }
  render() {
    return (
      <Canvas ref="canvas"></Canvas>
    );
  }
}

export default App;
