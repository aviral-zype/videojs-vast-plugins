import videojs from 'video.js';
import './index';

/**
 * Search a param value in the current query string
 */
const getURLParameter = (param) => {
  const result = window.location.search.match(new RegExp(`(\\?|&)${param}(\\[\\])?=([^&]*)`));
  return result ? decodeURIComponent(result[3]) : undefined;
};
globalThis.getURLParameter = getURLParameter;
const player = videojs('my-video', { autoplay: false, muted: true });
const vastAd = "https://cdn.theoplayer.com/demos/ads/vast/vast.xml"
const vmapAd = "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/simid&description_url=https%3A%2F%2Fdevelopers.google.com%2Finteractive-media-ads&sz=640x480&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
const skippableAd = "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
// Initialize the VAST plugin
const options = {
  // vastUrl: vastAd,
  // vmapUrl: vmapAd,
  adUrl: vmapAd,
  debug: true,
}

const option2 = {
  // vastUrl: vastAd,
  // vmapUrl: vmapAd,
  adUrl: vastAd,
  debug: true,
}
player.vast(options);
// console.log(player)
// Add event listeners
player.on('play', () => {
  console.log('Video started playing');
  player.vast(options)
});

player.on('pause', () => {
  console.log('Video paused');
});

player.on('ended', () => {
  console.log('Video ended');
});
let oldtime = -1
player.on('timeupdate', (e) => {
  let currentTime = player.currentTime()
  currentTime = Math.floor(currentTime)
  if(oldtime !== currentTime && currentTime && currentTime % 5 === 0){
    oldtime = currentTime
    // player.scheduleAdBreak()
  }
})
player.on('adtimeupdate', (e) => {
  // console.log("XXX",player.ads.isAdPlaying())
  // console.log("A+ACA AD IS PLA?YIN")
  // console.log(player)
})
// ...

// You can add more event listeners as needed

// globalThis.adsPlugin = vastPlugin;
globalThis.player = player;