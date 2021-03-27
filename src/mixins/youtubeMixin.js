export default {
    data () {
        return {
            clicked: false,
            onceLoaded: false
        }
    },
    methods: {
        getYouTubeID (url) {
            url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            /* eslint-disable no-useless-escape */
            return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
        },
        calcAspect (aspect) {
            let aspects = aspect.split(':')
            if(typeof aspects[1] === "undefined") {
                return 56.25; /* 16:9 */
            } else {
                return aspects[1]/aspects[0] * 100
            }
        },
        isPostMessageSupported () {
            if (!window.postMessage) {
                console.info('Client does not support postMessage')
                return false
            }
            return true
        },
        pauseVideo() {
            if(!this.isPostMessageSupported) {
                return
            }

            if(this.iframeEl !== null) {
                this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
            }
        },
        playVideo() {
            if(!this.isPostMessageSupported) {
                return
            }

            if(this.iframeEl !== null) {
                this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
            } else {
                this.createIframe(this.isVideoFound);
            }
        },

        stopVideo() {
            if(!this.isPostMessageSupported) {
                return
            }

            if(this.iframeEl !== null) {
                this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
            }
        },
        resetView() {
            if(this.iframeEl !== null) {
                // Removing form dom
                this.iframeEl.remove();

                // Resetting the states
                this.iframeEl = null;
                this.clicked = false;
               this.onceLoaded = false
            }
        },
        createIframe(flag) {
            if(this.iframeEl === null && flag) {
                this.clicked = true;
                this.iframeEl = document.createElement('iframe');
                this.iframeEl.setAttribute('src', `https://www.youtube.com/embed/${this.videoID}?enablejsapi=1&autoplay=1`);
                this.iframeEl.setAttribute('frameborder', `0`);
                this.iframeEl.setAttribute('allow', `accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture`);
                this.iframeEl.setAttribute('allowfullscreen', `1`);
                this.iframeEl.setAttribute('title', `${this.getTitle}`);

                this.iframeEl.addEventListener('load', this.handleLoad)

                this.$el.lastChild.appendChild(this.iframeEl);

                this.iframeEl.focus()

            }
        },
        handleLoad () {

            if(this.fetchingInfo === false) {
                if(!this.onceLoaded) {
                    this.onceLoaded = true
                    console.info('Video is loaded')
                    return
                }

            }

        }
    }
};