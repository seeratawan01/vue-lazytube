<template>
  <VideoWrapper :aspectRatioValue="aspectRatioValue" :maxWidth="maxWidth">
    <Preview
        :isVideoFound="isVideoFound"
        :fetchingInfo="fetchingInfo"
        :defaultThumbnailQuality="thumbnailQuality"
        :customThumbnail="customThumbnail"
        :videoTitle="getTitle"
        :videoID="videoID"
        :showTitle="showTitle"

        :clicked="clicked"
        :onceLoaded="onceLoaded"
        @click="handleClick"
    >
      <template v-slot:button>
        <slot name="button"/>
      </template>

      <template v-slot:loader>
        <slot name="loader"/>
      </template>

    </Preview>
  </VideoWrapper>
</template>

<script>

// Importing Components
import VideoWrapper from './common/Wrapper.vue'
import Preview from './common/Preview.vue'
import Helper from "../mixins/Helper.vue";
import {fetchingOembed, getYouTubeID, isPostMessageSupported} from "../utils";

export default {
  name: "LazyYoutube",
  mixins: [Helper],
  components: {
    VideoWrapper,
    Preview
  },
  data() {
    return {
      clicked: false,
      onceLoaded: false,

      iframeEl: null,
      videoInfo: null,
      fetchingInfo: true,
      isVideoFound: false
    }
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    aspectRatio: {
      type: String,
      default: '16:9',
      validator: function (value) {
        return /^\d+:\d+$/u.test(value)
      },
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    },
    maxWidth: {
      type: String,
      default: '560px',
      required: false
    },
    autoplay: {
      type: Boolean,
      default: false,
      required: false
    },
    thumbnailQuality: {
      type: String,
      default: 'standard',
      required: false
    },
    iframeClass: {
      type: String,
      default: 'ly-iframe',
      required: false
    },
    customTitle: {
      type: String,
      default: '',
      required: false
    },
    customThumbnail: {
      type: String,
      default: '',
      required: false
    },
    oembedFetch: {
      type: Boolean,
      default: true,
      required: false
    },
  },

  computed: {
    videoID: function () {
      return getYouTubeID(this.src)
    },
  },

  mounted() {
    this.fetchingOembed()
  },
  methods: {
    handleClick() {
      this.clicked = true
      if (this.fetchingInfo === false && !this.onceLoaded && this.isVideoFound) {
        this.initiateIframe()
      }
    },
    pauseVideo() {
      if (!isPostMessageSupported) {
        return
      }

      if (this.iframeEl !== null) {
        this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*')
      }
    },
    playVideo() {
      if (!isPostMessageSupported) {
        return
      }

      if (this.iframeEl === null) {
        this.initiateIframe(this.autoplay)
      } else {
        this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*')
      }
    },

    stopVideo() {
      if (!isPostMessageSupported) {
        return
      }

      if (this.iframeEl !== null) {
        this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
      }
    },

    fetchingOembed() {
      if (this.oembedFetch) {
        // Fetch Oembed
        fetchingOembed(this.src)
            .then(function (response) {
              return response.json()
            }).then(response => {
          this.videoInfo = response
          this.isVideoFound = true
        })
            .catch(() => {
              // handle error
              this.videoInfo = null
              this.isVideoFound = false
            })
            .finally(() => {
              // always executed
              this.fetchingInfo = false

              if (this.autoplay) {
                this.playVideo()
              }
            })
      } else {
        this.isVideoFound = true
        this.fetchingInfo = false
      }
    },

    resetState() {
      this.resetView()
      this.clicked = false
      this.onceLoaded = false
      this.iframeEl = null
      this.videoInfo = null
      this.fetchingInfo = true
      this.isVideoFound = false
    },

  },

  watch: {
    'src': function (val, oldVal) {
      if (val !== oldVal) {
        this.resetState();
        this.fetchingOembed()
      }
    }
  }
}
</script>
