import {defineComponent, h, isVue2} from "vue-demi"
import Wrapper from "./common/Wrapper.vue";
import Preview from "./common/Preview.vue";
import {calcAspect, createIframe, fetchingOembed, getYouTubeID, isPostMessageSupported} from '../utils'
import Helper from "../Helper.vue";

export default defineComponent({
    mixins: [Helper],
    props: {
        src: {
            type: String,
            required: true,
        },
        aspectRatio: {
            type: String,
            default: '16:9',
            validator: function (value) {
                return /^\d+:\d+$/u.test(value)
            },
            required: false
        },
        showTitle: {
            type: Boolean,
            default: true,
            required: false
        },
        maxWidth: {
            type: String,
            default: '560px',
            required: false
        },
        autoplay: {
            type: Boolean,
            default: false,
            required: false
        },
        thumbnailQuality: {
            type: String,
            default: 'standard',
            required: false
        },
        iframeClass: {
            type: String,
            default: 'ly-iframe',
            required: false
        },
        customTitle: {
            type: String,
            default: '',
            required: false
        },
        customThumbnail: {
            type: String,
            default: '',
            required: false
        },
        oembedFetch: {
            type: Boolean,
            default: true,
            required: false
        },
    },
    data() {
        return {
            clicked: false,
            onceLoaded: false,

            iframeEl: null,
            videoInfo: null,
            fetchingInfo: true,
            isVideoFound: false
        }
    },
    mounted() {
        if (this.oembedFetch) {
            // Fetch Oembed
            fetchingOembed(this.src)
                .then(function(response) {
                return response.json()
            }).then(response => {
                this.videoInfo = response
                this.isVideoFound = true
            })
                .catch( () => {
                // handle error
                this.videoInfo = null
                this.isVideoFound = false
            })
                .finally( () => {
                    // always executed
                    this.fetchingInfo = false

                    if (this.autoplay) {
                        this.playVideo()
                    }
                })
        } else {
            this.isVideoFound = true
            this.fetchingInfo = false
        }
    },
    methods: {
        pauseVideo () {
            if (!isPostMessageSupported) {
                return
            }

            if (this.iframeEl !== null) {
                this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*')
            }
        },
        playVideo () {
            if (!isPostMessageSupported) {
                return
            }

            if (this.iframeEl === null) {
                this.initiateIframe(this.autoplay)
            } else {
                this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*')
            }
        },

        stopVideo () {
            if (!isPostMessageSupported) {
                return
            }

            if (this.iframeEl !== null) {
                this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
            }
        },

    },
    computed: {
        videoID: function () {
            return getYouTubeID(this.src)
        },
    },
    render() {

        if (isVue2) {
            return h(
                Wrapper,
                {
                    aspectRatioValue: this.aspectRatioValue,
                    maxWidth: this.maxWidth
                },
                () => [h(Preview, {
                    isVideoFound: this.isVideoFound,
                    fetchingInfo: this.fetchingInfo,
                    defaultThumbnailQuality: this.thumbnailQuality,
                    customThumbnail: this.customThumbnail,
                    videoTitle: this.getTitle,
                    videoID: this.videoID,
                    showTitle: this.showTitle,

                    clicked: this.clicked,
                    onceLoaded: this.onceLoaded,

                    on: {
                        click: () => {
                            this.clicked = true
                            if (this.fetchingInfo === false && !this.onceLoaded && this.isVideoFound) {
                                this.initiateIframe()
                            }
                        }
                    },

                }, {
                    button: () => this.$slots.button ? this.$slots.button() : null,
                    loader: () => this.$slots.loader ? this.$slots.loader() : null,
                })]
            )
        }
        return h(
            Wrapper,
            {
                aspectRatioValue: this.aspectRatioValue,
                maxWidth: this.maxWidth
            },
            () => [h(Preview, {
                isVideoFound: this.isVideoFound,
                fetchingInfo: this.fetchingInfo,
                defaultThumbnailQuality: this.thumbnailQuality,
                customThumbnail: this.customThumbnail,
                videoTitle: this.getTitle,
                videoID: this.videoID,
                showTitle: this.showTitle,

                clicked: this.clicked,
                onceLoaded: this.onceLoaded,


                onClick: () => {
                    this.clicked = true
                    if (this.fetchingInfo === false && !this.onceLoaded && this.isVideoFound) {
                        this.initiateIframe()
                    }
                }
            }, {
                button: () => this.$slots.button ? this.$slots.button() : null,
                loader: () => this.$slots.loader ? this.$slots.loader() : null,
            })]
        )
    },
})
