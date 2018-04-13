
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}
function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

class UrlManager {
  constructor(validTypes){
    this.validTypes = validTypes;
  }
  processUrlParams(){
    return {
      type: this.readUrlType(),
      params: this.readUrlParams(),
    }
  }
  generateUrl(type, settingsObj){
    const settingsJson = JSON.stringify(settingsObj);
    const customEncoded = b64EncodeUnicode(settingsJson);
    return `${ window.location.origin }/?custom=${ customEncoded }#${ type }`;
  }
  readUrlParams(){
    const queryString = window.location.search;
    if (queryString.includes('custom=')){
      const customString = queryString.split('custom=')[1].split('&')[0];
      const customSettings = JSON.parse(b64DecodeUnicode(customString));
      console.log(customSettings);
      return {
        custom: customSettings,
      };
    }
    return {};
  }
  readUrlType(){
    const hash = window.location.hash;
    if (hash){
      const type = hash.substring(1).toLowerCase();
      const validTypes = this.validTypes.map(t => t.type);
      if (validTypes.includes(type)){
        return type;
      }
    }
    return null;
  }
  setUrl(visuType){
    // clear url, then update hash
    window.history.pushState('', '', '/');
    window.location.hash = "#" + visuType;
  }
}

export default UrlManager;