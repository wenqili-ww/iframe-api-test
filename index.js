var isMute = false;

window.wirewax.addEventListener(window.wirewax.events.listeners.PLAYER_READY, function(data) {
  console.log('Parent window get message: Player is ready: ', data);
});

window.wirewax.addEventListener(window.wirewax.events.listeners.HAS_PAUSED, function(data) {
  console.log('Parent window get message: Video has paused!', data);
});

window.wirewax.addEventListener(window.wirewax.events.listeners.HAS_PLAYED, function(data) {
  console.log('Parent window get message: Video has played!', data);
});

window.wirewax.addEventListener(window.wirewax.events.listeners.HAS_SEEKED, function(data) {
  console.log('Parent window get message: Video has seeked!', data);
});

window.wirewax.addEventListener(window.wirewax.events.listeners.TAG_CLICK, function(data) {
  console.log('Parent window get message: Tag clicked!: ', data);
});

window.wirewax.addEventListener(window.wirewax.events.listeners.WIDGET_SHOWN, function(data) {
  console.log('Parent window get message: Widget shown!', data);
});

window.wirewax.addEventListener(window.wirewax.events.listeners.WIDGET_CLOSED, function(data) {
  console.log('Parent window get message: Widget Close!', data);
});

window.wirewax.addEventListener(window.wirewax.events.listeners.VOLUME_CHANGE, function(data) {
  console.log('Parent window get message: Volume changed: ', data);
});

window.wirewax.addEventListener(window.wirewax.events.listeners.RENDITION_CHANGED, function(data) {
  console.log('Parent window get message: rendition changed:', data);
});

window.wirewax.addEventListener(window.wirewax.events.listeners.VIDEO_END, function(data) {
  console.log('Parent window get message: Video has ended!', data);
});

window.wirewax.addEventListener(window.wirewax.events.listeners.RETURN_CURRENT_TIME, function(data) {
  console.log('Parent window get message: Get Current frame: ', data);
});

window.wirewax.addEventListener(window.wirewax.events.listeners.ADD_TO_CART, function(eventData){
  console.log('Parent window get message: Add to Cart: ', eventData);

})

window.addEventListener('resize', function() {
	window.wirewax.triggerEvent(window.wirewax.events.triggers.WINDOW_RESIZE)
});

window.playerReady = function() {
  window.wirewax.triggerEvent(window.wirewax.events.triggers.IS_PLAYER_READY);
}

window.playVideo = function() {
  console.log("HTML Page ▶️ Click PlayVideo");
  window.wirewax.triggerEvent(window.wirewax.events.triggers.PLAY);
}

window.pauseVideo = function() {
  window.wirewax.triggerEvent(window.wirewax.events.triggers.PAUSE);
}

window.seekVideo = function() {
window.wirewax.triggerEvent(window.wirewax.events.triggers.SEEK, 3);
}

window.goToTag = function() {
  window.wirewax.triggerEvent(window.wirewax.events.triggers.GO_TO_TAG, 5490840);
}

window.openTag = function() {
  window.wirewax.triggerEvent(window.wirewax.events.triggers.OPEN_TAG, 5490840);
}

window.closeOverlay = function() {
  window.wirewax.triggerEvent(window.wirewax.events.triggers.CLOSE_WIDGET);
}

window.getCurrentTime = function() {
	window.wirewax.triggerEvent(window.wirewax.events.triggers.GET_CURRENT_TIME);
}

window.changeVolume = function(volume) {
	window.wirewax.triggerEvent(window.wirewax.events.triggers.CHANGE_VOLUME, volume);
}

window.toggleMute = function() {
	isMute = !isMute;
  if(isMute) {
		window.wirewax.triggerEvent(window.wirewax.events.triggers.MUTE_VOLUME, isMute);
  } else {
		window.wirewax.triggerEvent(window.wirewax.events.triggers.UNMUTE_VOLUME, isMute);
  }
}

window.changeRendition = function() {
	var value = document.getElementById("rendition").value;
	window.wirewax.triggerEvent(window.wirewax.events.triggers.CHANGE_RENDITION, value);
}