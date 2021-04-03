export default {
    methods: {
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
            let thumbnail;

            if(video_id){
                if(typeof quality == "undefined"){
                    quality = 'high';
                }

                let quality_key = '960x540';
                if(quality === 'default'){
                    quality_key = '200x150';
                }
                else if(quality === 'medium'){
                    quality_key = '295x166';
                }
                else if(quality === 'high'){
                    quality_key = '640x360';
                }
                else if (quality === 'standard') {
                    quality_key = '960x540';
                }
                else if (quality === 'maxres') {
                    quality_key = '1280x720';
                }

                thumbnail = "https://i.vimeocdn.com/video/"+video_id+"_"+quality_key+".jpg";
                return thumbnail;
            }

            return false;
        }
    }
};