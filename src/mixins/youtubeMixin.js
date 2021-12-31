export default {
  methods: {
    getYouTubeID (url) {
      url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/u)
      /* eslint-disable no-useless-escape */
      return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/iu)[0] : url[0]
    },
    pauseVideo () {
      if (!this.isPostMessageSupported) {
        return
      }

      if (this.iframeEl !== null) {
        this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*')
      }
    },
    playVideo () {
      if (!this.isPostMessageSupported) {
        return
      }

      if (this.iframeEl !== null) {
        this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*')
      } else {
        this.createIframe(this.isVideoFound, 'youtube')
      }
    },

    stopVideo () {
      if (!this.isPostMessageSupported) {
        return
      }

      if (this.iframeEl !== null) {
        this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
      }
    },
    getYoutubeThumbnail (video_id, quality) {
      if (video_id) {
        if (typeof quality === 'undefined') {
          quality = 'high'
        }

        let quality_key = 'maxresdefault' // Max quality
        if (quality === 'default') {
          quality_key = 'default'
        } else if (quality === 'medium') {
          quality_key = 'mqdefault'
        } else if (quality === 'high') {
          quality_key = 'hqdefault'
        } else if (quality === 'standard') {
          quality_key = 'sddefault'
        } else if (quality === 'maxres') {
          quality_key = 'maxresdefault'
        }

        return `https://img.youtube.com/vi/${video_id}/${quality_key}.jpg`;
      }

      return false
    }
  }
}
