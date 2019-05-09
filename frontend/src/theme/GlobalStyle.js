import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
    
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 2rem;
    line-height: 1rem;
    ${
      "" /* background: ${props => props.theme.black};
    color: ${props => props.theme.offWhite}; */
    }
  }
  
 @keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


  `;
