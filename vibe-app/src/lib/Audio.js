
class AudioTrack {
  constructor(path, filename, description, url){
    this.path = path;
    this.filename = filename;
    this.description = description;
    this.url = url;
    this.src = this.path + '/' + this.filename;
  }
}

const COOKIE_MUTE = 'audioMuted';
const COOKIE_SONG = 'audioTrack';

class AudioManager {
  constructor(tracks){
    this.tracks = tracks;
    this.index = 1;

    this.jukeboxPlaying = true;
    // var jukeboxPlaying = getCookie(COOKIE_MUTE) === "false";
    // if (window.location.href.includes("file://")){
    //   jukeboxPlaying = false;
    // }
  }
  loadTrack(filename){
    const { tracks } = this;

    var toLoad = tracks[0];
    for (var i = 0; i < tracks.length; i++){
      var currTitle = tracks[i].filename;
      if (currTitle === filename){
        toLoad = tracks[i];
        this.index = i;
      }
    }
    console.log(toLoad);
    // setCookie(COOKIE_SONG, toLoad.filename, 7);
  }
  togglePlay(){
    this.jukeboxPlaying = !this.jukeboxPlaying;
  }
  nextTrack(){
    const { tracks, index } = this;
    const newIndex = (index + 1 + tracks.length) % tracks.length;
    this.loadTrack(tracks[newIndex].filename);
  }
  getData(){
    return {
      ...this.tracks[this.index],
      isPlaying: this.jukeboxPlaying,
    }
  }
}

const tracks = [
  new AudioTrack(
    'https://s3.amazonaws.com/vibe.mpaulweeks.com/music',
    'FIRSTAID_VibeWithYou.mp3',
    'FIRSTAID - Vibe With You',
    'https://first-aid.bandcamp.com/album/nostalgic-falling-down'
  ),
  new AudioTrack(
    'https://s3.amazonaws.com/vibe.mpaulweeks.com/music',
    'TheFatRat_TimeLapse.mp3',
    'TheFatRat - Time Lapse',
    'https://lnk.to/tfrtimelapse'
  ),
  new AudioTrack(
    'https://s3.amazonaws.com/vibe.mpaulweeks.com/music',
    'Justice_CloseCall.mp3',
    'Justice - Close Call',
    'https://itunes.apple.com/us/album/woman/id1151157609'
  ),
];

const Audio = new AudioManager(tracks);

export default Audio;