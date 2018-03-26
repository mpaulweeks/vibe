import React from 'react';

import Canvas from './view/Canvas';
import Brain from './lib/Brain';

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
