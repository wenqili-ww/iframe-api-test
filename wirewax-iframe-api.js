
/*
	NOTE: This file must be manually updated on S3 as it is not part of the regular deployment process
*/

(function(){
    if(!window.wirewax) {
        window.wirewax = {}
    }

    window.wirewax.playerId = 'wirewax-player';
    window.wirewax.events = {};
    const url = window.location.href;
    console.log(url);

    window.wirewax.events.listeners = {
        'PLAYER_READY' : 'playerReady',
        'HAS_PLAYED': 'hasPlayed',
        'HAS_PAUSED': 'hasPaused',
        'HAS_SEEKED': 'hasSeeked',
        'ADD_TO_CART' : 'addToCart',
        'VIDEO_END' : 'videoEnd',
        'VOLUME_CHANGE': 'volumeChange',
        'TAG_CLICK' : 'tagClick',
        'RETURN_CURRENT_TIME' : 'returnCurrentTime',
        'CLIENT_CUSTOM_EVENT': 'clientCustomEvent',
        'WIDGET_SHOWN': 'widgetShown',
        'WIDGET_CLOSED': 'widgetClosed',
        'RENDITION_CHANGED': 'renditionChanged',
        'SCORM_EVENT': 'scormEvent'
    };

    window.wirewax.events.triggers = {
        'PLAY' : 'videoPlay',
        'PAUSE': 'videoPause',
        'SEEK' : 'videoSeek',
        'IS_PLAYER_READY' : 'isPlayerReady',
        'GET_CURRENT_TIME' : 'getCurrentTime',
        'GO_TO_TAG' : 'goToTag',
        'OPEN_TAG' : 'openTag',
        'CHANGE_VOLUME' : 'changeVolume',
        'MUTE_VOLUME': 'muteVolume',
        'UNMUTE_VOLUME': 'unMuteVolume',
        'CLOSE_WIDGET' : 'closeWidget',
        'DEVICE_ORIENTATION': 'deviceOrientation',
        'DEVICE_MOTION': 'deviceMotion',
        'DEVICE_SCREEN_ORIENTATION': 'deviceScreenOrientation',
        'CLIENT_CUSTOM_TRIGGER': 'clientCustomTrigger',
        'CHANGE_RENDITION': 'changeRendition',
        'ENTER_FULLSCREEN': 'enterFullscreen',
    };

    window.wirewax.renditions = {
        '360': '360',
        '540': '540',
        '720': '720',
        '1080': '1080',
        '4k': '4k'
    };

    window.wirewax.debug = true;

    var subscriptions = {};
    var subscriberNumber = 0;

    function log(logName, data){
        if(window.wirewax.debug){
            console.log(logName, data);
        }
    }

    window.wirewax.addEventListener = function(eventName, callback) {
        if(!subscriptions[eventName]) {
            subscriptions[eventName] = [];
        }

        var subscriptionId = subscriptions[eventName].length;
        subscriptions[eventName].push(callback);
        log("addEventListener", {name: eventName, callback: callback});
        return function(){
            subscriptions[eventName].splice(subscriptionId, 1);
        }
    };

    window.wirewax.triggerEvent = function(eventName, data) {
        try {
            var wwIframe = document.getElementById(window.wirewax.playerId).contentWindow;
        }
        catch(err) {
            console.error('Could not find the WIREWAX Iframe on this page with ID '+window.wirewax.playerId);
            return;
        }

        if(data === undefined || data === null) {
            wwIframe.postMessage(eventName, "*");
        }
        else {
            log("triggerEvent", {name: eventName, data: data});
            wwIframe.postMessage({name: eventName, data: data}, "*");
        }
    };

    window.addEventListener("message", function(event){
        var data = event.data;

        if(typeof event.data == 'string') {
            try {
                data = JSON.parse(event.data);
            }
            catch(err) {
                if(data.indexOf('{') != -1) {
                    console.error('Error parsing JSON string', event.data);
                }
            }
        }

        for(var listener in window.wirewax.events.listeners) {
            var listenerName = window.wirewax.events.listeners[listener];
            if(data.name === listenerName) {
                if(subscriptions[listenerName]) {
                    for(var i = 0; i < subscriptions[listenerName].length; i++) {
                        subscriptions[listenerName][i](event.data);
                    }
                }
            }
        }
    }, false);

    function enableGyro() {
        window.wirewax.addEventListener(window.wirewax.events.listeners.HAS_PLAYED, function(data) {
            window.wirewax.triggerEvent(window.wirewax.events.triggers.DEVICE_SCREEN_ORIENTATION, window.orientation);
        });

        window.addEventListener("devicemotion", function(event) {
            var data = {
                accelerationIncludingGravity: {
                    z: event.accelerationIncludingGravity.z
                }
            };
            window.wirewax.triggerEvent(window.wirewax.events.triggers.DEVICE_MOTION, data);
        }, false);
        window.addEventListener("deviceorientation", function(event) {
            var data = {
                gamma: event.gamma,
                alpha: event.alpha,
                beta: event.beta,
                webkitCompassHeading: event.webkitCompassHeading
            };
            window.wirewax.triggerEvent(window.wirewax.events.triggers.DEVICE_ORIENTATION, data);
        }, false);
        window.addEventListener("orientationchange", function(event) {
            window.wirewax.triggerEvent(window.wirewax.events.triggers.DEVICE_SCREEN_ORIENTATION, window.orientation);
        }, false);
        window.wirewax.gyroEnabled = true;
    }

    // can preset if necessary
    if (window.wirewax.gyroEnabled) {
        enableGyro();
    } else {
        window.wirewax.gyroEnabled = false;
    }
    // can only call once
    window.wirewax.enableGyro = function() {
        if (window.wirewax.gyroEnabled) return;
        enableGyro();
    }
})();