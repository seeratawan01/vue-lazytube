<script setup>
import { LazyYoutube } from './components/';
</script>

<script >
export default {
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
        src="https://www.youtube.com/watch?v=TcMBFSGVi1c"
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
