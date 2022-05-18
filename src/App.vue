<template>
  <div id="app">

    <h2>Vimeo Lazy Video</h2>
    <input class="input" type="text" @keydown.enter="handleSearch($event, 'vimeo')" placeholder="Vimeo Video Link" :value="vimeoLink">

    <LazyVimeo  ref="vimeoLazyVideo"
                :src="vimeoLink"
                max-width="720px"
                aspect-ratio="16:9"
                thumbnail-quality="standard">

      <template v-slot:button>
<!--        <button>Play</button>-->
      </template>

      <template v-slot:loader>
        <button>Loading</button>
      </template>
    </LazyVimeo>


    <div class="buttons">
      <button @click="handleClick('playVideo', 'vimeoLazyVideo')">Play</button>
      <button @click="handleClick('stopVideo', 'vimeoLazyVideo')">Stop</button>
      <button @click="handleClick('pauseVideo', 'vimeoLazyVideo')">Pause</button>
      <button @click="handleClick('resetView', 'vimeoLazyVideo')">Reset</button>
    </div>

    <h2>Youtube Lazy Video</h2>

    <input class="input" type="text" @keydown.enter="handleSearch($event, 'youtube')" placeholder="Youtube Video Link or Video Id" :value="youtubeLink">

    <LazyYoutube
        ref="youtubeLazyVideo"
        :src="youtubeLink"
        max-width="720px"
        aspect-ratio="16:9"
        thumbnail-quality="standard"
    />

    <div class="buttons">
      <button @click="handleClick('playVideo', 'youtubeLazyVideo')">Play</button>
      <button @click="handleClick('stopVideo', 'youtubeLazyVideo')">Stop</button>
      <button @click="handleClick('pauseVideo', 'youtubeLazyVideo')">Pause</button>
      <button @click="handleClick('resetView', 'youtubeLazyVideo')">Reset</button>
    </div>


  </div>
</template>

<script>
import LazyYoutube from './components/LazyYoutube'
import LazyVimeo from "./components/LazyVimeo";



export default {
  name: 'App',
  data () {
    return {
      youtubeLink:'https://www.youtube.com/watch?v=TcMBFSGVi1c',
      vimeoLink:'https://player.vimeo.com/video/64654583'
    }
  },
  components: {
    LazyVimeo,
    LazyYoutube
  },
  mounted() {
    // this.$refs['lazyVideo'].playVideo();
  },
  methods: {
    handleClick(event, ref) {
      this.$refs[ref][event]()
    },
    handleSearch(e, platform) {
      if(platform === 'youtube')
        this.youtubeLink = e.target.value;
      else
        this.vimeoLink = e.target.value;
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
h2 {
  margin-bottom: 0;
  margin-top: 2rem;
}
.input {
  padding: 5px;
  max-width: 720px;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 90%;
}

.buttons {
  margin-top: 25px;
}
</style>

