import "styled-components";

// and extend them!
declare module "styled-components" {
  // ThemeProvider theme에 적용할 타입으로, theme의 속성과 동일하게 작성
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      white: string;
      gray: string;
    };
    fonts: {
      helperText: string;
      subBody: string;
      body: string;
      strongBody: string;
      label: string;
      heading: string;
      subHeading: string;
    };
  }
}
