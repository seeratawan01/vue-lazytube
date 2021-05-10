<template>
    <VideoWrapper :aspectRatioValue="aspectRatioValue" :maxWidth="maxWidth">
      <Preview
          v-if="!onceLoaded"
          @click="createIframe(isVideoFound, 'youtube')">

        <template v-if="isVideoFound ">
          <img v-if="isCustomThumbnailExist" :src="customThumbnail" alt=""
                @error="$event.target.src=getYoutubeThumbnail(videoID, thumbnailQuality)"
          >
          <img
              v-else
              :src="getYoutubeThumbnail(videoID, thumbnailQuality)" alt=""
          >
          <template v-if="showTitle">
            <span class="ly-text">{{isCustomTitleExist ? customTitle : getTitle}}</span>
          </template>

          <button  class="ly-button-wrapper" v-show="!clicked">
            <slot name="button">
                <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                  <path class="ly-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>
            </slot>
          </button>

          <div v-show="clicked" class="ly-loader-wrapper">
            <slot name="loader">
              <span  class="ly-ring">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </slot>
          </div>
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

      <div class="ly-iframe-wrapper"  v-show="onceLoaded">
      </div>
    </VideoWrapper>
</template>

<script>


// Importing Mixins
import youtubeMixin from '../mixins/youtubeMixin'
import commonMixin from "../mixins/commonMixin";

// Importing Components
import VideoWrapper from './common/Wrapper'
import Preview from './common/Preview'

export default {
  name: "LazyYoutube",
  mixins: [commonMixin,youtubeMixin],
  components: {
    VideoWrapper,
    Preview
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
    iframeClass: {
      type: String,
      default: 'ly-iframe'
    },
    customTitle: {
      type: String,
      default: ''
    },
    customThumbnail: {
      type: String,
      default: ''
    }
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
    },
    isCustomTitleExist () {
      return this.customTitle.trim().length > 0
    },
    isCustomThumbnailExist () {
      return this.customThumbnail.trim().length > 0
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.fetchingOembed('youtube')
    })

  },
  watch: {
    'src': function (val, oldVal) {
      if(val !== oldVal) {
        this.resetState();
        this.fetchingOembed('youtube')
      }
    }
  }
}
</script>
