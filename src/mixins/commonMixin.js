// Importing Utils
const axios = require('axios').default

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
    fetchingOembed (type = 'youtube') {
      const self = this
      let url = ''

      url = type === 'youtube' ? `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${this.videoID}&format=json` : `https://vimeo.com/api/v2/video/${this.videoID}.json`
      axios.get(url)
        .then(function (response) {
          // handle success
          if(type === 'youtube') {
            self.videoInfo = response.data
          }

          if (type === 'vimeo') {
            self.videoInfo = response.data[0]
          }

          self.isVideoFound = true
        })
        .catch(function () {
          // handle error
          self.videoInfo = null
          self.isVideoFound = false
        })
        .finally(function () {
          // always executed
          self.fetchingInfo = false

          if (self.autoplay) {
            self.playVideo()
          }
        })
    },
    isPostMessageSupported () {
      if (!window.postMessage) {
        return false
      }
      return true
    },

    createIframe (flag = true, type = 'youtube') {
      if (this.iframeEl === null && flag) {
        this.clicked = true
        this.iframeEl = document.createElement('iframe')
        if (type === 'youtube') {
          this.iframeEl.setAttribute('src', `https://www.youtube.com/embed/${this.videoID}?enablejsapi=1&autoplay=1`)
        } else {
          this.iframeEl.setAttribute('src', `https://player.vimeo.com/video/${this.videoID}?autoplay=1`)
        }
        this.iframeEl.setAttribute('frameborder', '0')
        this.iframeEl.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture')
        this.iframeEl.setAttribute('allowfullscreen', '1')
        this.iframeEl.setAttribute('title', `${this.getTitle}`)
        this.iframeEl.setAttribute('class', `${this.iframeClass}`)

        this.iframeEl.addEventListener('load', this.handleLoad)

        this.$el.lastChild.appendChild(this.iframeEl)

        this.iframeEl.focus()
      }
    },
    resetView () {
      if (this.iframeEl !== null) {
        // Removing form dom
        this.iframeEl.remove()

        // Resetting the states
        this.iframeEl = null
        this.clicked = false
        this.onceLoaded = false
      }
    },
    resetState () {
      this.resetView()
      this.clicked = false,
      this.onceLoaded = false,
      this.iframeEl = null,
      this.videoInfo = null,
      this.fetchingInfo = true,
      this.isVideoFound = false
    },
    calcAspect (aspect) {
      const aspects = aspect.split(':')

      return typeof aspects[1] === 'undefined' ? 56.25 : aspects[1] / aspects[0] * 100
    },
    handleLoad () {
      if (this.fetchingInfo === false) {
        if (!this.onceLoaded) {
          this.onceLoaded = true
        }
      }
    }
  }
}
