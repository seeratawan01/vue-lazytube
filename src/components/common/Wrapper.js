import styled from 'vue-styled-components';

const divProps = { aspectRatioValue: String | Number, maxWidth: String };

export default  styled('div', divProps)`

  --aspect-ratio:  ${props => props.aspectRatioValue? props.aspectRatioValue : 56}
  max-width:  ${props => props.maxWidth? props.maxWidth : '560px'}
  width: 100%;
  display: inline-block;
 
  background-color: #000000;
  position: relative;
  
  & * {
    padding:0;margin:0;overflow:hidden; box-sizing: border-box;
  }

  &:before {
    display: block;
    padding-top: 56.25%; /* 16:9 */

    /* falls back to 16/9, but otherwise uses ratio from HTML */
    padding-top: calc(var(--aspect-ratio) * 1%);
    content: "";
  }

  iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
`;