export default {
    methods: {
        getYouTubeID (url) {
            url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            /* eslint-disable no-useless-escape */
            return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
        },
        createContent (videoID, title) {
            return `<style>
                  *{padding:0;margin:0;overflow:hidden; box-sizing: border-box;}
                  html,body{height:100%; font-family: Arial, sans-serif;}
                  .ly-wrapper { 
                    text-decoration: none;
                    padding: 12px;
                    color: #ffffff;
                    background: url(https://i.ytimg.com/vi_webp/${videoID}/maxresdefault.webp) center center no-repeat;
                    background-size: cover;
 
                    display: block;
                    height: 100%;
                    width: 100%;
                    
                    cursor:pointer;
                  }
                   .ly-wrapper img {
                       align-self: center;
                       width: 100%;
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
                        margin-left: -34px;
                        margin-top: -24px;
                        -webkit-transition: opacity .25s cubic-bezier(0,0,0.2,1);
                        transition: opacity .25s cubic-bezier(0,0,0.2,1);
                        z-index: 63;
                   }
                   .ly-text {
                        width: 82%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: block;
                        font-size: 18px;
                   }
                   .ly-large-play-button-bg {
                     -webkit-transition:fill .1s cubic-bezier(0.4,0,1,1),fill-opacity .1s cubic-bezier(0.4,0,1,1);
                     transition:fill .1s cubic-bezier(0.4,0,1,1),fill-opacity .1s cubic-bezier(0.4,0,1,1);
                     fill:#212121;
                     fill-opacity:.8
                    }
                    .ly-large-play-button-bg:hover, .ly-wrapper:hover .ly-large-play-button-bg {
                     -webkit-transition:fill .1s cubic-bezier(0,0,0.2,1),fill-opacity .1s cubic-bezier(0,0,0.2,1);
                     transition:fill .1s cubic-bezier(0,0,0.2,1),fill-opacity .1s cubic-bezier(0,0,0.2,1);
                     fill:#f00;
                     fill-opacity:1
                    }
                  </style>
                  <a class="ly-wrapper" href=https://www.youtube.com/embed/${videoID}?autoplay=1 >
                      <span class="ly-text" v-if="title.length">${title}</span>
                      
                      <button >
                     <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                     <path class="ly-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>
                      </button>
                  </a>
    
                    `;
        },
        calcAspect (aspect) {
            let aspects = aspect.split(':')
            if(typeof aspects[1] === "undefined") {
                return 56.25; /* 16:9 */
            } else {
                return aspects[1]/aspects[0] * 100
            }
        },
        iframeURLChange(iframe, callback) {
            var lastDispatched = null;
            // var oldDoc = null;

            var dispatchChange = function () {
                // const propser= {...iframe.contentWindow.location}
                // console.log(iframe.contentWindow.location, lastDispatched)
                // callback(propser);
                var newHref = iframe.contentDocumentf;


                if (newHref !== lastDispatched) {
                    callback(newHref, lastDispatched);
                    lastDispatched = newHref;
                }
            };

            var unloadHandler = function () {
                // Timeout needed because the URL changes immediately after
                // the `unload` event is dispatched.
                setTimeout(dispatchChange, 0);
            };

            function attachUnload() {
                // Remove the unloadHandler in case it was already attached.
                // Otherwise, there will be two handlers, which is unnecessary.
                iframe.contentWindow.removeEventListener("unload", unloadHandler);
                iframe.contentWindow.addEventListener("unload", unloadHandler);
            }

            iframe.addEventListener("load", function () {
                attachUnload();

                // Just in case the change wasn't dispatched during the unload event...
                dispatchChange();
            });

            attachUnload();
        }
    }
};