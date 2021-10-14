import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react-hooks";
import api from "./api/api";
import App from "./App";
import Home from "./page/Home";
import { render } from "./test-utils";
import useFetch from "./utils/hooks/useFetch";
import worldCupsJson from "./assets/temp/worldCups.json";
import categoriesJson from "./assets/temp/categories.json";

describe("App", () => {
  test("check if app renders correctly", async () => {
    // App
    const component = render(<App />);
    const { result, waitForNextUpdate } = await renderHook(() => useFetch(api.getCategories));
    expect(result.current.data).toEqual(null);
    expect(result.current.isLoading).toBeTruthy();
    expect(component.getByTestId("spinner")).toBeInTheDocument();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.data).toEqual(categoriesJson.data);
    expect(component.queryByTestId("spinner")).not.toBeInTheDocument();

    // Home
    const { result: worldcups, waitForNextUpdate: waitForHome } = await renderHook(() =>
      useFetch(api.getWorldCups),
    );
    expect(worldcups.current.data).toEqual(null);
    expect(worldcups.current.isLoading).toBeTruthy();
    await waitForHome();
    expect(worldcups.current.data).toEqual(worldCupsJson.data);
    expect(worldcups.current.isLoading).toBeFalsy();
  });
});
