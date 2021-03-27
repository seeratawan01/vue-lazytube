import styled from 'vue-styled-components';

const divProps = { videoID: String | Number, isVideoFound: Boolean };

export default  styled('a', divProps)`
  text-decoration: none;
  padding: 21px;
  color: #ffffff;
  
  ${props => {
      if(props.isVideoFound && props.videoID) {
          return `background: url(https://i.ytimg.com/vi_webp/${props.videoID}/maxresdefault.webp) center center no-repeat`;

      }

  }}
  
  background-size: cover;

  display: block;
  height: 100%;
  width: 100%;

  cursor: pointer;
  position: absolute;
  top: 0;

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
    
    &__reason{
      font-size: 22px;
      padding-bottom: 10px;
    }  
    &__subreason{
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
  }

  .ly-large-play-button-bg {
    -webkit-transition: fill .1s cubic-bezier(0.4, 0, 1, 1), fill-opacity .1s cubic-bezier(0.4, 0, 1, 1);
    transition: fill .1s cubic-bezier(0.4, 0, 1, 1), fill-opacity .1s cubic-bezier(0.4, 0, 1, 1);
    fill: #212121;
    fill-opacity: .8
  }

  .ly-large-play-button-bg:hover, &:hover .ly-large-play-button-bg {
    -webkit-transition: fill .1s cubic-bezier(0, 0, 0.2, 1), fill-opacity .1s cubic-bezier(0, 0, 0.2, 1);
    transition: fill .1s cubic-bezier(0, 0, 0.2, 1), fill-opacity .1s cubic-bezier(0, 0, 0.2, 1);
    fill: #f00;
    fill-opacity: 1
  }


  .ly-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    background-image: radial-gradient(#ffffff05 10%,#2a2d2a4f,#ffffff05 80%);

    span {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 67px;
      height: 67px;
      margin: 6px;
      border: 7px solid #F8F8F8;
      border-radius: 50%;
      animation: ly-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #F8F8F8 transparent transparent transparent;

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

`;