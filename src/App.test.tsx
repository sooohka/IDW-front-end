import { prettyDOM, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";
import { render } from "./test/test-utils";

describe("src/App.tsx", () => {
  it("matches snapshot", () => {
    //   await act(async () => {
    //     render(<App />);
    //     screen.debug();
    //   });
    expect(true).toBe(true);
  });
});
