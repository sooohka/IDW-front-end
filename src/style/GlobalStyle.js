import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const globalStyle = createGlobalStyle`

*{
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root{
  min-height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  padding: 0 3rem;
}

#modal-root{
  
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



code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

`;

export default globalStyle;
