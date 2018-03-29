import React from 'react';
import styled from 'styled-components';

import Audio from '../lib/Audio';

const JukeboxContainer = styled.div`
`;
const SongTitle = styled.div`
  padding: 5px 0px;
`;
const AudioElm = styled.audio`
  display: none;
`;

class Jukebox extends React.Component {
  toggle() {
    Audio.togglePlay();
    this.forceUpdate();
  }
  next() {
    Audio.nextTrack();
    this.forceUpdate();
  }
  render() {
    const data = Audio.getData();
    return (
      <JukeboxContainer>
        { data.isPlaying && (
          <AudioElm src={ data.src } autoPlay loop></AudioElm>
        )}

        <div>you are currently listening to</div>
        <SongTitle>
          <a target="_blank" href={ data.url }>{ data.description }</a>
        </SongTitle>
        <div>
          <button onClick={() => this.toggle()}>
            { data.isPlaying ? 'stop music' : 'play music' }
          </button>
          <button onClick={() => this.next()}>
            next track
          </button>
        </div>
      </JukeboxContainer>
    );
  }
}

export default Jukebox;
