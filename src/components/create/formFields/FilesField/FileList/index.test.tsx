import FilesList from ".";
import { act, screen, render, createWithThemeProvider } from "../../../../../__test__/test-utils";

describe("src/components/create/formFields/FilesField", () => {
  it("renders", () => {
    const component = createWithThemeProvider(<FilesList />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("", async () => {
    act(() => {
      render(<FilesList />);
    });
    screen.debug();
  });
});
