<script>
import {getVimeoThumbnail, getYoutubeThumbnail} from "../../utils";

export default {
  props: {
    type: {
      type: String,
      default: 'youtube',
      required: false
    },
    clicked: {
      type: Boolean,
      default: false,
      required: false
    },
    onceLoaded: {
      type: Boolean,
      default: false,
      required: false
    },
    isVideoFound: {
      type: Boolean,
      default: false,
      required: false
    },
    fetchingInfo: {
      type: Boolean,
      default: false,
      required: false
    },
    defaultThumbnailQuality: {
      type: String,
      default: 'standard',
      required: false
    },
    videoTitle: {
      type: String,
      default: '',
      required: false
    },
    videoID: {
      type: String,
      default: '',
      required: true
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    },
    customThumbnail: {
      type: String,
      default: '',
      required: false
    },

  },
  computed: {
    isCustomTitleExist () {
      return this.customTitle.trim().length > 0
    },
    isCustomThumbnailExist () {
      return this.customThumbnail.trim().length > 0
    },
    defaultThumbnail () {
      if (this.type === 'youtube') {
        return getYoutubeThumbnail(this.videoID, this.defaultThumbnailQuality)
      } else {
        return  getVimeoThumbnail(this.videoID, this.defaultThumbnailQuality)
      }
    }
  }
}
</script>

<template>
  <a class="vlt-preview">
    <template v-if="!onceLoaded">
      <template v-if="isVideoFound ">
        <img v-if="isCustomThumbnailExist" :src="customThumbnail" :alt="'Video - ' + videoTitle"
             @error="$event.target.src=defaultThumbnail"
        >
        <img
            v-else
            :src="defaultThumbnail" :alt="'Video - ' + videoTitle"
        >

        <template v-if="showTitle">
          <span class="ly-text">{{videoTitle}}</span>
        </template>


        <button  class="ly-button-wrapper" v-show="!clicked">
          <slot name="button">
            <svg v-if="type === 'youtube'" height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
              <path class="ly-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path>
            </svg>
            <svg v-else height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
              <path class="ly-large-play-button-bg--v"
                    d="M 63 0 C 55.79 0.13 34 0 34 0 S 12.21 0.13 0 0 C 0.06 13.05 0 24 0 24 s 0.06 10.95 0 24 C 12.21 47.87 34 48 34 48 s 21.79 -0.13 34 -0 C 67.94 34.95 68 24 68 24 S 67.94 13.05 68 0 z" fill="#00adef"></path>
              <path d="M 45,24 27,14 27,34" fill="#fff"></path>
            </svg>
          </slot>
        </button>

        <div v-show="clicked" class="ly-loader-wrapper">
          <slot name="loader">
              <span  class="ly-ring">
                <span></span>
                <span></span>
                <span></span>
              </span>
          </slot>
        </div>

      </template>

      <template v-else-if="!fetchingInfo">
        <div class="ly-error-container">
            <span class="ly-error-icon">
              <svg fill="#fff" viewBox="0 0 48 48">
                <path d="M0 0h48v48H0V0z" fill="none"></path>
                <path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z" fill-opacity="0.7"></path>
              </svg>
            </span>

          <span class="ly-error-content">
            <span class="ly-error-content__reason">
              <span>Video unavailable</span>
            </span>
            <span class="ly-error-content__subreason">
              <span>This video is unavailable.</span>
            </span>
          </span>
        </div>

      </template>
    </template>
  </a>
</template>

<style lang="scss">
.vlt-preview {
  text-decoration: none;
  padding: 21px !important;
  color: #ffffff;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  background-size: cover;
  display: block;
  height: 100%;
  width: 100%;
  cursor: pointer;
  position: absolute;
  top: 0;
  &:after {
    background: radial-gradient(circle,rgba(19, 19, 27, 0.13) 0%,rgba(0,0,0,0) 40%,rgba(86, 88, 88, 0.09) 100%) no-repeat center center fixed;
    content: "";
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
  &:before {
    content: "";
    height: 60px;
    padding-bottom: 50px;
    top: 0;
    left: 0;
    z-index: 25;
    background-position: top;
    width: 100%;
    position: absolute;
    background-repeat: repeat-x;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);
    -moz-transition: opacity .25s cubic-bezier(0.0, 0.0, 0.2, 1);
    -webkit-transition: opacity .25s cubic-bezier(0.0, 0.0, 0.2, 1);
    transition: opacity .25s cubic-bezier(0.0, 0.0, 0.2, 1);
    pointer-events: none;
    opacity: 0.9;
  }
  .ly-error-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #282828;
    padding: 0 4rem;
  }
  .ly-error-icon {
    height: 64px;
    width: 64px;
    min-width: 64px;
    min-height: 64px;
    margin-right: 12px;
    margin-top: -4px;
  }
  .ly-error-content {
    display: flex;
    flex-direction: column;
    text-shadow: 0 0 2px rgba(0, 0, 0, .5);
    font-family: "YouTube Noto", Roboto, Arial, Helvetica, sans-serif;
    &__reason {
      font-size: 22px;
      padding-bottom: 10px;
    }
    &__subreason {
      font-size: 18px;
    }
  }
  button {
    border: none;
    background-color: transparent;
    padding: 0;
    color: inherit;
    text-align: inherit;
    font-size: 100%;
    font-family: inherit;
    cursor: pointer;
    line-height: inherit;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 68px;
    height: 48px;
    transform: translate(-50%, -50%);
    -webkit-transition: opacity .25s cubic-bezier(0, 0, 0.2, 1);
    transition: opacity .25s cubic-bezier(0, 0, 0.2, 1);
    z-index: 63;
  }
  .ly-text {
    position: relative;
    z-index: 26;
    text-shadow: 0 0 2px rgba(0, 0, 0, .5);
    font-family: "YouTube Noto", Roboto, Arial, Helvetica, sans-serif;
    width: 82%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    font-size: 18px;
    color: #ffffff;
  }
  .ly-large-play-button-bg, .ly-large-play-button-bg--v {
    -webkit-transition: fill .1s cubic-bezier(0.4, 0, 1, 1), fill-opacity .1s cubic-bezier(0.4, 0, 1, 1);
    transition: fill .1s cubic-bezier(0.4, 0, 1, 1), fill-opacity .1s cubic-bezier(0.4, 0, 1, 1);
    fill: #1b1b1b;
    fill-opacity: .9
  }
  .ly-large-play-button-bg:hover, &:hover .ly-large-play-button-bg {
    -webkit-transition: fill .1s cubic-bezier(0, 0, 0.2, 1), fill-opacity .1s cubic-bezier(0, 0, 0.2, 1);
    transition: fill .1s cubic-bezier(0, 0, 0.2, 1), fill-opacity .1s cubic-bezier(0, 0, 0.2, 1);
    fill: #f00;
    fill-opacity: 1
  }
  .ly-large-play-button-bg--v:hover, &:hover .ly-large-play-button-bg--v {
    -webkit-transition: fill .1s cubic-bezier(0, 0, 0.2, 1), fill-opacity .1s cubic-bezier(0, 0, 0.2, 1);
    transition: fill .1s cubic-bezier(0, 0, 0.2, 1), fill-opacity .1s cubic-bezier(0, 0, 0.2, 1);
    fill: #00adef;
    fill-opacity: 1
  }
  .ly-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
    position: absolute;
    z-index: 8;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    span {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 67px;
      height: 67px;
      margin: 6px;
      border: 7px solid #ffffff;
      border-radius: 50%;
      animation: ly-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #FFFFFF transparent transparent transparent;
      &:nth-child(1) {
        animation-delay: -0.45s;
      }
      &:nth-child(2) {
        animation-delay: -0.3s;
      }
      &:nth-child(3) {
        animation-delay: -0.15s;
      }
    }
  }
  @keyframes ly-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

</style>
