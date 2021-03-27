<template>
  <div id="app">
    <LazyYoutube
        ref="lazyVideo"
        src="https://www.youtube.com/watch?v=5GRbUnw64W0"
        max-width="720px"
        aspect-ratio="16:9"
        :show-title="true"
        thumbnail-quality="standard"
    />

    <button style="position: relative;z-index: 999999;" @click="handleClick('playVideo')">Play</button>
    <button style="position: relative;z-index: 999999;" @click="handleClick('stopVideo')">Stop</button>
    <button style="position: relative;z-index: 999999;" @click="handleClick('pauseVideo')">Pause</button>
    <button style="position: relative;z-index: 999999;" @click="handleClick('resetView')">Reset</button>

  </div>
</template>

<script>
import LazyYoutube from './components/LazyYoutube'

export default {
  name: 'App',
  components: {
    LazyYoutube
  },
  mounted() {
    // this.$refs['lazyVideo'].playVideo();
  },
  methods: {
    handleClick(event) {
      this.$refs['lazyVideo'][event]()
    }
  }

}
</script>

