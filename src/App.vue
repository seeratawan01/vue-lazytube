<script setup>
import { LazyVimeo } from './components/';
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
    <LazyVimeo
        ref="lazyVideo"
        :src="vimeoLink"

        :autoplay="false"
    >
<!--      <template v-slot:button>-->
<!--        Loading-->
<!--      </template>-->
    </LazyVimeo>

    <button @click="handleClick('playVideo')">Play</button>
    <button @click="handleClick('stopVideo')">Stop</button>
    <button @click="handleClick('pauseVideo')">Pause</button>
    <button @click="handleClick('resetView')">Reset</button>
  </div>

</template>
