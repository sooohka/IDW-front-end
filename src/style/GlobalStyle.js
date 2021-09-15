import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const globalStyle = createGlobalStyle`

*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size:1.8rem;
    color: ${({ _ }) => theme.colors.primary};
    line-height: 140%;
}
html {
  height: 100%;
  font-size: 62.5%;
  height: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
#root{
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding:0 5rem;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

`;

export default globalStyle;
