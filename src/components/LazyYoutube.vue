<template>
    <VideoWrapper :aspectRatioValue="aspectRatioValue" :maxWidth="maxWidth">
      <Preview :videoID="videoID" v-if="!onceLoaded"  @click="createIframe">

            <span class="ly-text" v-if="getTitle.length">{{getTitle}}</span>
                <button v-show="!played">
                  <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                    <path class="ly-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>
                </button>

      </Preview>
<!--      <a class="ly-wrapper" href="#"  @click.prevent="createIframe" v-if="!onceLoaded">-->

<!--        <button >-->
<!--          <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">-->
<!--            <path class="ly-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>-->
<!--        </button>-->
<!--      </a>-->
<!--      <iframe-->
<!--          @load="handleLoad($event)"-->
<!--          width="560"-->
<!--          :src="`https://www.youtube.com/embed/${videoID}`"-->
<!--          :srcdoc="createContent(videoID, getTitle)"-->
<!--          frameborder="0"-->
<!--          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"-->
<!--          allowfullscreen-->
<!--          :title="getTitle"-->
<!--      ></iframe>-->
    </VideoWrapper>
</template>

<script>

// Importing Helpers
const axios = require('axios').default;

// Importing Mixins
import youtubeMixin from '../mixins/youtubeMixin'


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
      played: false,
      iframeEl: null,
      videoInfo: null,
      fetchingInfo: true,
      onceLoaded: false
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
    }
  },
  mounted() {
    let self = this;
    this.$nextTick(function () {
      axios.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${this.videoID}&format=json`)
          .then(function (response) {
            // handle success
            self.videoInfo = response.data;
          })
          .catch(function (error) {
            // handle error
            self.videoInfo = null
            console.log(error);
          })
          .then(function () {
            // always executed
            self.fetchingInfo = false
          });
    })


    },
  methods: {
    createIframe() {
      if(this.iframeEl === null) {
        this.played = true;
      this.iframeEl = document.createElement('iframe');
      this.iframeEl.setAttribute('src', `https://www.youtube.com/embed/${this.videoID}?autoplay=1`);
      this.iframeEl.setAttribute('frameborder', `0`);
      this.iframeEl.setAttribute('allow', `accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture`);
      this.iframeEl.setAttribute('allowfullscreen', `1`);
      this.iframeEl.setAttribute('title', `${this.getTitle}`);

      this.iframeEl.addEventListener('load', this.handleLoad)

      this.$el.appendChild(this.iframeEl);

      }
    },
    handleLoad () {

      if(this.fetchingInfo === false) {
        if(!this.onceLoaded) {
          this.onceLoaded = true
          return
        }

        console.log("loaded")
      }

    }
  }
}
</script>

<style scoped>
*{padding:0;margin:0;overflow:hidden; box-sizing: border-box;}
html,body{height:100%; font-family: Arial, sans-serif;}


</style>