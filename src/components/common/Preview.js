import styled from 'vue-styled-components';

export default  styled('a')`
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

`;