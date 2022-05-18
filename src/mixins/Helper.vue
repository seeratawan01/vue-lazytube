<script>
import {calcAspect, createIframe} from "../utils";

export default {
  name: "Helper",
  computed: {
    aspectRatioValue: function () {
      return calcAspect(this.aspectRatio)
    },
    getTitle: function () {
      if (this.customTitle) {
        return this.customTitle
      }
      return this.videoInfo !== null ? this.videoInfo.title : this.customTitle
    },
  },
  methods: {
    resetView() {
      if (this.iframeEl !== null) {
        // Removing form dom
        this.iframeEl.remove()

        // Resetting the states
        this.iframeEl = null
        this.clicked = false
        this.onceLoaded = false
      }
    },
    initiateIframe(autoplay = false, type = 'youtube') {
      this.iframeEl = createIframe(this.videoID, this.getTitle, this.iframeClass, type)

      this.iframeEl.addEventListener('load', () => {
        if (this.fetchingInfo === false) {
          if (!this.onceLoaded) {
            this.onceLoaded = true
          }
        }

        if (autoplay) {
          if (type === 'youtube') {
            this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*')
          } else {
            this.iframeEl.contentWindow.postMessage('{"method":"play"}', '*');
          }
        }
      })

      this.$el.appendChild(this.iframeEl)
      this.iframeEl.focus()
    }
  }
}
</script>

