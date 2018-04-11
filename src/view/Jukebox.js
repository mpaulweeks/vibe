import React from 'react';
import styled from 'styled-components';

import {
  Message,
  Button,
} from './Component';

const JukeboxContainer = styled.div`
`;
const SongTitle = styled.div`
  padding: 5px 0px;
  font-size: 18px;
`;
const AudioElm = styled.audio`
  display: none;
`;

class Jukebox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    this.audio.addEventListener('ended', () => {
      this.next(true);
    });
    this.updateState();

    // debugging
    window.audio = this.audio;
    // this.audio.currentTime = 185;
  }
  updateState() {
    const { audio } = this;
    const { data } = this.state
    const newData = this.props.audio.getData();

    if (data.src !== newData.src){
      audio.src = newData.src;
    }
    if (audio.paused === newData.isPlaying){
      if (newData.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    this.setState({
      data: newData,
    })
  }
  togglePlay() {
    this.props.audio.togglePlay();
    this.updateState();
  }
  toggleRepeat() {
    this.props.audio.toggleRepeat();
    this.updateState();
  }
  next(isTrackEnd) {
    this.props.audio.nextTrack(isTrackEnd);
    this.updateState();
  }
  render() {
    const { data } = this.state;
    return (
      <JukeboxContainer>
        <AudioElm innerRef={ elm => this.audio = elm }></AudioElm>

        <Message>you are currently listening to</Message>
        <SongTitle>
          <a target="_blank" href={ data.url }>{ data.description }</a>
        </SongTitle>
        <Message>
          <Button onClick={() => this.togglePlay()}>
            { data.isPlaying ? 'stop music' : 'play music' }
          </Button>
          <Button onClick={() => this.next()}>
            next track
          </Button>
        </Message>
        <Message>
          repeat track?
          <Button onClick={() => this.toggleRepeat()}>
            { data.repeat ? 'yes' : 'no' }
          </Button>
        </Message>
      </JukeboxContainer>
    );
  }
}

export default Jukebox;
