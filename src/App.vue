<template>
  <div id="app">
    <input class="input" type="text" @keydown.enter="handleSearch" placeholder="Youtube Video Link or Video Id" :value="youtubeLink">


    <LazyYoutube
        ref="lazyVideo"
        :src="youtubeLink"
        max-width="720px"
        aspect-ratio="16:9"
        thumbnail-quality="standard"
    />

    <div class="buttons">
      <button @click="handleClick('playVideo')">Play</button>
      <button @click="handleClick('stopVideo')">Stop</button>
      <button @click="handleClick('pauseVideo')">Pause</button>
      <button @click="handleClick('resetView')">Reset</button>
    </div>
  </div>
</template>

<script>
import LazyYoutube from './components/LazyYoutube'

export default {
  name: 'App',
  data () {
    return {
      youtubeLink:'https://www.youtube.com/watch?v=TcMBFSGVi1c'
    }
  },
  components: {
    LazyYoutube
  },
  mounted() {
    // this.$refs['lazyVideo'].playVideo();
  },
  methods: {
    handleClick(event) {
      this.$refs['lazyVideo'][event]()
    },
    handleSearch(e) {
      this.youtubeLink = e.target.value;
    }
  }

}
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
.input {
  padding: 5px;
  width: 720px;
  margin-top: 25px;
  margin-bottom: 25px;
}

.buttons {
  margin-top: 25px;
}
</style>

