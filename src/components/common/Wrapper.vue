<script>

export default {
  props: {
    aspectRatioValue: String | Number,
    maxWidth: String | Number
  },

  computed: {
    cssVars() {
      return {
        /* variables you want to pass to css */
        '--vlt-aspect-ratio': this.aspectRatioValue ? this.aspectRatioValue : 56,
        '--vlt-max-width': this.maxWidth ? this.maxWidth : '560px'
      }
    }
  }
}

</script>

<template>
  <div class="vlt-wrapper" :style="cssVars">
    <slot />
  </div>
</template>

<style>
  .vlt-wrapper {
    max-width: var(--vlt-max-width);
    width: 100%;
    display: inline-block;

    background-color: #000000;
    position: relative;
  }

  .vlt-wrapper * {
    padding:0;
    margin:0;
    overflow:hidden;
    box-sizing: border-box;
  }

  .vlt-wrapper:before {
     display: block;
     padding-top: 56.25%; /* 16:9 */
     /* falls back to 16/9, but otherwise uses ratio from HTML */
     padding-top: calc(var(--vlt-aspect-ratio) * 1%);
     content: "";
   }

  .vlt-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
</style>
