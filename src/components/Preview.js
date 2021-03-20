import styled from 'vue-styled-components';

const divProps = { videoID: String | Number };

export default  styled('a', divProps)`
      text-decoration: none;
      padding: 12px;
      color: #ffffff;
      background: url(https://i.ytimg.com/vi_webp/${props => props.videoID? props.videoID : ''}/maxresdefault.webp) center center no-repeat;
      background-size: cover;
    
      display: block;
      height: 100%;
      width: 100%;
    
      cursor:pointer;
      
      position: absolute;
top: 0;

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

`;