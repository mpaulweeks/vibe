import React from 'react';
import styled from 'styled-components';

import {
  SubRow,
  Button,
  BigSelect,
} from './Common';

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
    const { brain } = this.props;
    brain.addCallback(() => {
      this.updateState();
    });

    this.audioElm.addEventListener('ended', () => {
      this.next(true);
    });
    this.updateState();
  }
  updateState() {
    const { audioElm } = this;
    const { data } = this.state;
    const newData = this.props.audio.getData();

    if (data.src !== newData.src){
      audioElm.src = newData.src;
    }
    if (audioElm.paused === newData.isPlaying){
      if (newData.isPlaying) {
        audioElm.play().catch(error => {
          this.togglePlay();
        });
      } else {
        audioElm.pause();
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
  prev() {
    this.props.audio.prevTrack();
    this.updateState();
  }
  next(isTrackEnd) {
    this.props.audio.nextTrack(isTrackEnd);
    this.updateState();
  }
  onChangePlaylistStyle(elm) {
    this.props.audio.setPlaylistStyle(elm.value);
    this.updateState();
  }
  render() {
    const { audio } = this.props;
    const { data } = this.state;
    return (
      <JukeboxContainer>
        <AudioElm innerRef={ elm => this.audioElm = elm }></AudioElm>

        { data.isPlaying ? (
          <div>
            <SubRow>you are currently listening to</SubRow>
            <SongTitle>
              <a target="_blank" href={ data.url }>{ data.description }</a>
            </SongTitle>
            <SubRow>
              <Button onClick={() => this.prev()}>
                prev track
              </Button>
              <Button onClick={() => this.next()}>
                next track
              </Button>
              <BigSelect
                onChange={elm => this.onChangePlaylistStyle(elm.target)}
                value={ data.playlistStyle }
              >
                <option value={ audio.PlaylistStyle.Default }>play in order</option>
                <option value={ audio.PlaylistStyle.Shuffle }>shuffle</option>
                <option value={ audio.PlaylistStyle.RepeatSong }>repeat track</option>
              </BigSelect>
            </SubRow>
            <SubRow>
              <Button onClick={() => this.togglePlay()}>
                stop music
              </Button>
            </SubRow>
          </div>
        ) : (
          <Button onClick={() => this.togglePlay()}>
            play music
          </Button>
        )}
      </JukeboxContainer>
    );
  }
}

export default Jukebox;
