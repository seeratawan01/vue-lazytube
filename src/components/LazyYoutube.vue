<template>
    <VideoWrapper :aspectRatioValue="aspectRatioValue" :maxWidth="maxWidth">
      <Preview
          v-if="!onceLoaded"
          @click="createIframe(isVideoFound)">

        <template v-if="isVideoFound ">
          <img
              :src="getYoutubeThumbnail(videoID, this.thumbnailQuality)" alt=""
          >
          <span class="ly-text" v-if="getTitle.length">{{getTitle}}</span>
          <button v-show="!clicked">
            <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
              <path class="ly-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>
          </button>

          <span v-show="clicked" class="ly-ring">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </template>

        <template v-else-if="!fetchingInfo">
          <div class="ly-error-container">
            <span class="ly-error-icon">
              <svg fill="#fff" viewBox="0 0 48 48">
                <path d="M0 0h48v48H0V0z" fill="none"></path>
                <path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z" fill-opacity="0.7"></path>
              </svg>
            </span>

            <span class="ly-error-content">
            <span class="ly-error-content__reason">
              <span>Video unavailable</span>
            </span>
            <span class="ly-error-content__subreason">
              <span>This video is unavailable.</span>
            </span>
          </span>
          </div>

        </template>
      </Preview>

      <div class="ly-iframe"  v-show="onceLoaded">
      </div>
    </VideoWrapper>
</template>

<script>

// Importing Utils
const axios = require('axios').default;

// Importing Mixins
import youtubeMixin from '../mixins/youtubeMixin'

// Importing Components
import VideoWrapper from '../components/Wrapper'
import Preview from '../components/Preview'

export default {
  name: "LazyYoutube",
  mixins: [youtubeMixin],
  components: {
    VideoWrapper,
    Preview
  },
  data () {
    return {
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
          return /^\d+:\d+$/.test(value)
      },
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    maxWidth: {
      type: String,
      default: '560px'
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    thumbnailQuality: {
      type: String,
      default: 'standard'
    },

  },
  computed: {
    videoID: function () {
      return this.getYouTubeID(this.src)
    },
    aspectRatioValue: function () {
      return this.calcAspect(this.aspectRatio)
    },
    getTitle:function () {
      return this.videoInfo !== null ? this.videoInfo.title : ''
    }
  },
  mounted() {
    let self = this;
    this.$nextTick(function () {
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
    })


    },
  methods: {

  }
}
</script>

<style>


</style>