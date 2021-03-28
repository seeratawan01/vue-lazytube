// Importing Utils
const axios = require('axios').default;

export default {
    data () {
        return {
            clicked: false,
            onceLoaded: false,
            iframeEl: null,
            videoInfo: null,
            fetchingInfo: true,
            isVideoFound: false
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
        resetState() {
            this.resetView()
            this.clicked= false,
            this.onceLoaded= false,
            this.iframeEl= null,
            this.videoInfo= null,
            this.fetchingInfo= true,
            this.isVideoFound= false
        },
        fetchingOembed() {
            let self = this;
            axios.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${this.videoID}&format=json`)
                .then(function (response) {
                    // handle success
                    self.videoInfo = response.data;
                    self.isVideoFound = true

                })
                .catch(function () {
                    // handle error
                    self.videoInfo = null
                    self.isVideoFound = false
                })
                .then(function () {
                    // always executed
                    self.fetchingInfo = false

                    if(self.autoplay) {
                        self.playVideo()
                    }
                });
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
                this.iframeEl.setAttribute('class', `${this.iframeClass}`);

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

        },
        getYoutubeThumbnail(video_id, quality){
            let thumbnail;

            if(video_id){
                if(typeof quality == "undefined"){
                    quality = 'high';
                }

                let quality_key = 'maxresdefault'; // Max quality
                if(quality === 'default'){
                    quality_key = 'default';
                }
                else if(quality === 'medium'){
                    quality_key = 'mqdefault';
                }
                else if(quality === 'high'){
                    quality_key = 'hqdefault';
                }
                else if (quality === 'standard') {
                    quality_key = 'sddefault';
                }
                else if (quality === 'maxres') {
                    quality_key = 'maxresdefault';
                }

                thumbnail = "http://img.youtube.com/vi/"+video_id+"/"+quality_key+".jpg";
                return thumbnail;
            }

            return false;
        }
    }
};