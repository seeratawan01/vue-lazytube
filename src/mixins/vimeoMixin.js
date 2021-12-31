// const axios = require('axios').default

export default {
    methods: {
        getVimeoID (url) {
            return new URL(url).pathname.split('/').pop();
        },
        playVideo() {
            if(!this.isPostMessageSupported) {
                return
            }

            if(this.iframeEl !== null) {
                this.iframeEl.contentWindow.postMessage('{"method":"play"}', '*');
            } else {
                this.createIframe(this.isVideoFound, 'vimeo');
            }
        },
        pauseVideo() {
            if(!this.isPostMessageSupported) {
                return
            }

            if(this.iframeEl !== null) {
                this.iframeEl.contentWindow.postMessage('{"method":"pause"}', '*');
            }
        },
        stopVideo() {
            if(!this.isPostMessageSupported) {
                return
            }

            if(this.iframeEl !== null) {
                this.iframeEl.contentWindow.postMessage('{"method":"pause"}', '*');
            }
        },

        getVimeoThumbnail(video_id, quality){
            if(!video_id) return false;
            
            const _quality = ['small', 'medium', 'large'].includes(quality) ? quality: 'medium';
            return this.videoInfo[`thumbnail_${_quality}`];
        }
    }
};
