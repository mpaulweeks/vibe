import React from 'react';
import styled from 'styled-components';

import Brain from './lib/Brain';

import Canvas from './view/Canvas';
import Footer from './view/Footer';


const PageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

class App extends React.Component {
  constructor(props){
    super(props)
    this.brain = new Brain();
    this.state = {
      ready: false,
    };

    // debugging
    window.brain = this.brain;
  }
  componentDidMount() {
    this.brain.init(this.refs.canvas.elm);
    console.log('mounted App', this.brain);
    this.setState({
      ready: true,
    })
  }
  render() {
    const { brain } = this;
    return (
      <PageContainer>
        <Canvas ref="canvas"></Canvas>
        {this.state.ready && (
          <Footer brain={brain}></Footer>
        )}
      </PageContainer>
    );
  }
}

export default App;
