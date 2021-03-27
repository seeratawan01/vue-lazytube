<template>
  <div id="app">
    <LazyYoutube
        ref="lazyVideo"
        src="https://www.youtube.com/watch?v=Y8Wp3dafaMQ"
        max-width="720px"
        aspect-ratio="16:9"
        :show-title="true"
        :pause-on-click-away="true"
    />

    <button style="position: relative;z-index: 999999;" @click="handleClick('playVideo')">Play</button>
    <button style="position: relative;z-index: 999999;" @click="handleClick('stopVideo')">Stop</button>
    <button style="position: relative;z-index: 999999;" @click="handleClick('pauseVideo')">Pause</button>
    <button style="position: relative;z-index: 999999;" @click="handleClick('resetView')">Reset</button>

<!--    <iframe width="560" height="315" src="https://www.youtube.com/embed/eVuPhZl4ksy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->

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

