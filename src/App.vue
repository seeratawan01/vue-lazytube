<script setup>
import { LazyYoutube } from './components/';
</script>

<script >
export default {
  data () {
    return {
      youtubeLink:'https://www.youtube.com/watch?v=TcMBFSGVi1c',
      vimeoLink:'https://player.vimeo.com/video/64654583'
    }
  },
  methods: {
    handleClick(event) {
      this.$refs["lazyVideo"][event]();
    },
  },
}
</script>

<template>
  <div>
    <LazyYoutube
        ref="lazyVideo"
        :src="youtubeLink"

        :autoplay="false"
    >
<!--      <template v-slot:button>-->
<!--        Loading-->
<!--      </template>-->
    </LazyYoutube>

    <button @click="handleClick('playVideo')">Play</button>
    <button @click="handleClick('stopVideo')">Stop</button>
    <button @click="handleClick('pauseVideo')">Pause</button>
    <button @click="handleClick('resetView')">Reset</button>
  </div>

</template>
