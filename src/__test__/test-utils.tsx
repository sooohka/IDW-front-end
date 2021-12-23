/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import { render, RenderOptions } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import renderer from "react-test-renderer";
import store from "../store";
import GlobalStyle from "../style/GlobalStyle";
import theme from "../style/theme";

const AllTheProviders: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalStyle />
          {children}
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const thunk =
  ({ dispatch, getState }: any) =>
  (next: any) =>
  (action: any) => {
    if (typeof action === "function")
      // 여기서 반환되는 action은 thunk함수임
      return action(dispatch, getState);
    return next(action);
  };

const useStore = (stateName: string, initState: any, reducer: any) => {
  const store = {
    dispatch: jest.fn((action: any) => {
      initState = reducer(initState, action);
    }),
    getState: jest.fn(() => ({ [stateName]: initState })),
  };
  const next = jest.fn();
  const makeThunk = (action: any) => thunk(store)(next)(action);
  return { store, next, makeThunk };
};

const createWithThemeProvider = (EL: ReactElement) => {
  return renderer.create(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {EL}
    </ThemeProvider>,
  );
};

const redux = { thunk, useStore };
export { redux, customRender as render, createWithThemeProvider };

export * from "@testing-library/react";
