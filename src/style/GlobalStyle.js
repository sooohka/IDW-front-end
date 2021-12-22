import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*,*::before,*::after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size:1.8rem;
    line-height: 140%;
}

html {
  min-height: 100%;
  min-width: 100%;
  font-size: 62.5%;
}

body {
  position: relative;
  min-height: 100%;
  min-width: 100%;
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
}



a,a:any-link,a:-webkit-any-link{
  text-decoration: none;
  color: transparent;
  &:hover{
    opacity: 0.8;
  }
}

textArea{
  all:unset;
}

p{
  margin:0;
  padding:0;
}

ul {
  list-style: none;
}

li{
  text-decoration: none;
}


code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

#root {
  flex: 1;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  position: relative;
}

#modal-root{
}
`;

export default GlobalStyle;
