# Vue Lazytube
> Embed a YouTube player easily and lazy load the video to save resources.

#### Buy Me a Coffee
[![Support me on Patreon](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dseeratawan%26type%3Dpledges&style=for-the-badge)](https://patreon.com/seeratawan)

### Installation

With a build system

```sh
$ npm install --save vue-lazytube
```
**OR**
```sh
$ yarn add vue-lazytube
```

### To make the plugin available globally
In your `main.js`:

```javascript
const LazyYoutube = require('vue-lazytube')
Vue.use(LazyYoutube)
```

**OR**

To include only in specific components
```javascript
import LazyYoutube from 'vue-lazytube'
```

### Directly in html

```html
<script src="./vue-lazytube.umd.min.js"></script>
```

### Usage

When you need a `contenteditable` element:

```javascript
<template>
    <LazyYoutube
        src="https://www.youtube.com/watch?v=5GRbUnw64W0"
        :show-title="true"
    />
</template>
```

### Props
| Name | Type | Default Value | Description | Required |
| ------ | ------ | ------ | ------ | ------ |
| `src` | `String` | `null` | To load video and iframe, should be youtube video link. | `true` |
| `aspectRatio` | `String` | `16:9` | Maintaining the aspect ratio of video, perfect for responsively handling video embeds based on the width of the parent, should be in `*:*` format. e.g, `1:1`, `4:3`, `16:9` and `21:9`. | `false` |
| `maxWidth` | `String` | `560px` | Defines maximum width of video container.  | `false` |
| `showTitle` | `Boolean` | `true` | Defines whether to show video title on top. | `false` |
| `autoplay` | `Boolean` | `false` | Defines whether to loads the iframe as page loads _(not recommended)_ | `false` |
| `thumbnailQuality` | `String` | `standard` | Defines the quality of thumbnail, should be one of the following `default`, `medium`, `high`, `standard` or `maxres` | `false` |

