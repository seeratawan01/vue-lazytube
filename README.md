# Vue Lazytube

Embed a YouTube or Vimeo player easily and lazy load the video to save resources and reduces initial load size.
Useful when performance and page size is important or for sites with many embedded videos.

For a simple example page with 10 videos, vue-lazytube will reduce loadtime by 7x and memory usage by 2-3x.


[Demo online](https://codesandbox.io/s/vue-lazytube-forked-17o8v?file=/src/App.vue) | [Tutorial](https://medium.com/geekculture/light-and-responsive-youtube-embeds-faster-vue-web-page-load-speeds-c8e477b93f0f) | [Sponsor](https://patreon.com/seeratawan)

[![GitHub release](https://img.shields.io/github/package-json/v/seeratawan01/vue-lazytube?label=Version%20)](https://github.com/seeratawan01/vue-lazytube) [![License](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT) [![downloads](https://img.shields.io/npm/dt/vue-lazytube?color=orange&label=Downloads)](https://www.npmjs.com/package/vue-lazytube)  [![filesize](https://img.shields.io/bundlephobia/minzip/vue-lazytube/1.1.0?color=yellow&label=Minified%20Size)](https://www.npmjs.com/package/vue-lazytube)


---
#### Table of Content
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
    * [Install Globally](#to-make-the-plugin-available-globally)
    * [Install Locally](#to-include-only-in-specific-components)
- [Usage](#usage)
- [API](#api)
    * [Props](#props)
    * [Slots](#slots)
    * [Methods](#methods)
    * [Example](#example)
- [License](#open-source-license)
- [Buy Me a Coffee](#buy-me-a-coffee)


## Features
- reduces initial load size by ~1.1 MB per video
- fully responsive and customizable through `props`
- provides methods to control (`play`, `stop`, `pause` and `reset`) embedded videos
- provide options to set up custom title and preview of embedded videos
- platform supported: Youtube and Vimeo

## Demo

[![view vue-lazytube](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-lazytube-forked-17o8v?file=/src/App.vue)

## Installation

With a build systems

```sh
$ npm install --save vue-lazytube
```
```sh
$ yarn add vue-lazytube
```

### To make the plugin available globally
In your `main.js`:

```javascript
import LazyTube from "vue-lazytube";

Vue.use(LazyTube);
```

### To include only in specific components
```javascript
import { LazyYoutube, LazyVimeo } from "vue-lazytube";

export default {
    name: 'YourComponent',
    components: {
        LazyYoutube,
        LazyVimeo
    },
}
```


## Usage

```javascript
<template>
    <!-- Youtube Embed -->
    <LazyYoutube src="https://www.youtube.com/watch?v=TcMBFSGVi1c" />

    <!-- Vimeo Embed -->
    <LazyVimeo src="https://player.vimeo.com/video/64654583" />
</template>
```

## API

### Props
| Name | Type | Default Value | Description | Required |
| ------ | ------ | ------ | ------ | ------ |
| `src` | `String` | `` | To load video and iframe, should be Youtube/Vimeo video link. | `true` |
| `aspectRatio` | `String` | `16:9` | Maintaining the aspect ratio of video, perfect for responsively handling video embeds based on the width of the parent, should be in `*:*` format. e.g, `1:1`, `4:3`, `16:9` and `21:9`. | `false` |
| `maxWidth` | `String` | `560px` | Defines maximum width of video container.  | `false` |
| `showTitle` | `Boolean` | `true` | Defines whether to show video title on top. | `false` |
| `autoplay` | `Boolean` | `false` | Defines whether to load the iframe as the page loads _(not recommended)_ | `false` |
| `thumbnailQuality` | `String` | `standard` | Defines the quality of thumbnail, should be one of the following `default`, `medium`, `high`, `standard` or `maxres` | `false` |
| `iframeClass` | `String` | `ly-iframe` | Defines the class on iframe element | `false` |
| `customTitle` | `String` | `` | Defines the custom title of the video | `false` |
| `customThumbnail` | `String` | `` | Defines the custom thumbnail image link of the video | `false` |


### Slots
This Component provides some slots. You can use the named slot to render custom play button and loader:

| Slot | Description |
| ------ | ------ |
| button | Slot gives an ability to provide custom play button |
| loader | Slot gives an ability to provide custom loader |



### Methods
These methods let you control the player using JavaScript, so you can perform the operations like `play`, `stop`, `pause` and `reset`.

>The user's browser must support the HTML5 postMessage feature. Most modern browsers support postMessage.

| Name | Type | Usage |
| ------ | ------ | ------ | 
| playVideo | `function` | `this.$refs["lazyVideo"]['playVideo']()` |
| stopVideo | `function` | `this.$refs["lazyVideo"]['stopVideo']()` |
| pauseVideo | `function` | `this.$refs["lazyVideo"]['pauseVideo']()` |
| resetView | `function` | `this.$refs["lazyVideo"]['resetView']()` |

_Note: Must Replace `lazyVideo` with your [ref](https://v3.vuejs.org/guide/component-template-refs.html)._

### Example
```javascript
<template>
    <LazyYoutube
        ref="lazyVideo"
        src="https://www.youtube.com/watch?v=TcMBFSGVi1c"
    />
    
    <button @click="handleClick('playVideo')">Play</button>
    <button @click="handleClick('stopVideo')">Stop</button>
    <button @click="handleClick('pauseVideo')">Pause</button>
    <button @click="handleClick('resetView')">Reset</button>
</template>

<script>
    export default {
      name: "YourComponent",
      components: {},
      methods: {
        handleClick(event) {
          this.$refs["lazyVideo"][event]();
        },
      },
    };
</script>
```

## Open Source License

You may use it under the terms of the [MIT Licenses](https://opensource.org/licenses/MIT)

## Buy Me a Coffee
[![Support me on Patreon](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dseeratawan%26type%3Dpledges&style=for-the-badge)](https://patreon.com/seeratawan)
