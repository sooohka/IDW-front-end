import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "../src/style/GlobalStyle";
import React from "react";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
      <Story></Story>
    </BrowserRouter>
  ),
];
