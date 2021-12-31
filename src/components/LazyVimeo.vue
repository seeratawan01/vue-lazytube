<template>
  <VideoWrapper :aspectRatioValue="aspectRatioValue" :maxWidth="maxWidth">
    <Preview
        v-if="!onceLoaded && videoID"
        @click="createIframe(isVideoFound, 'vimeo')">
      <template v-if="isVideoFound ">

        <img v-if="isCustomThumbnailExist" :src="customThumbnail" alt=""
             @error="$event.target.src=getVimeoThumbnail(videoID, thumbnailQuality)"
        >
        <img
            v-else
            :src="getVimeoThumbnail(videoID, thumbnailQuality)" alt=""
            @error="$event.target.src=videoInfo.thumbnail_url"
        >

        <template v-if="showTitle">
          <span class="ly-text">{{isCustomTitleExist ? customTitle : getTitle}}</span>
        </template>

        <button  class="ly-button-wrapper" v-show="!clicked">
          <slot name="button">
              <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                <path class="ly-large-play-button-bg--v"
                      d="M 63 0 C 55.79 0.13 34 0 34 0 S 12.21 0.13 0 0 C 0.06 13.05 0 24 0 24 s 0.06 10.95 0 24 C 12.21 47.87 34 48 34 48 s 21.79 -0.13 34 -0 C 67.94 34.95 68 24 68 24 S 67.94 13.05 68 0 z" fill="#00adef"></path>
                <path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>
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
              <span>This video is unavailable or embed permissions are disabled for this video</span>
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
import vimeoMixin from "../mixins/vimeoMixin";
import commonMixin from "../mixins/commonMixin";

// Importing Components
import Preview from "./common/Preview";
import VideoWrapper from "./common/Wrapper";

export default {
name: "LazyVimeo",
  mixins: [commonMixin, vimeoMixin],
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
  components: {
    VideoWrapper,
    Preview
  },
  mounted() {
    this.$nextTick(function () {
      this.fetchingOembed('vimeo')
    })

  },
  computed: {
    videoID: function () {
      return this.getVimeoID(this.src)
    },
    aspectRatioValue: function () {
      return this.calcAspect(this.aspectRatio)
    },
    getTitle:function () {
      return this.videoInfo !== null && this.videoInfo.title ? this.videoInfo.title : ''
    },
    isCustomTitleExist () {
      return this.customTitle.trim().length > 0
    },
    isCustomThumbnailExist () {
      return this.customThumbnail.trim().length > 0
    }
  },
  watch: {
    'src': function (val, oldVal) {
      if(val !== oldVal) {
        this.resetState();
        this.fetchingOembed('vimeo')
      }
    }
  }
}
</script>

<style scoped>

</style>
