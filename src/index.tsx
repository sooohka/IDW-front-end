import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { ThemeProvider as ST } from "styled-components";
import AppProvider from "@Utils/providers/AppProvider";
import App from "./App";
import store from "./store";
import GlobalStyle from "./style/GlobalStyle";
import theme, { sTheme } from "./style/theme";

const prepare = async () => {
  if (process.env.NODE_ENV === "development") {
    console.log("start mock server");

    const { worker } = await import("./test/mocks/browser");

    return worker.start({
      onUnhandledRequest: ({ method, url }) => {
        if (url.origin.includes("fontawesome")) return;
        if (url.origin.includes("static")) return;
        if (url.origin.includes("unsplash.com")) return;
        if (url.origin.includes("cloudinary")) return;
        if (url.origin.includes("localhost")) return;

        throw new Error(`Unhandled ${method} request to ${url}`);
      },
    });
  }
  return Promise.resolve();
};

prepare().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <ST theme={sTheme}>
          <Provider store={store}>
            <BrowserRouter>
              <GlobalStyle />
              <AppProvider>
                <App />
              </AppProvider>
            </BrowserRouter>
          </Provider>
        </ST>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root"),
  );
});
