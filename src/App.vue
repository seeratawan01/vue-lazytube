<template>
  <div id="app">
    <LazyYoutube src="https://www.youtube.com/watch?v=Y8Wp3dafaMQ" max-width="720px" aspect-ratio="16:9" :show-title="true" />
  </div>
</template>

<script>
import LazyYoutube from './components/LazyYoutube'

export default {
  name: 'App',
  components: {
    LazyYoutube
  },

}
</script>

