import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { SetupWorkerApi } from "msw";
import App from "./App";
import store from "./store";
import GlobalStyle from "./style/GlobalStyle";
import theme from "./style/theme";

const prepare = async () => {
  if (process.env.NODE_ENV === "development") {
    console.log("start mock server");
    await import("./mocks/browser").then(({ worker }) => worker.start());
  }
  return Promise.resolve();
};

prepare().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <GlobalStyle />
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root"),
  );
});
