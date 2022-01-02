import userEvent from "@testing-library/user-event";
import FileList from ".";
import { act, screen, render, createWithThemeProvider } from "../../../../../test/test-utils";

describe("src/components/create/formFields/FilesField/FileList", () => {
  it("renders", () => {
    const component = createWithThemeProvider(<FileList />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("render '파일이 없습니다' when has no children", async () => {
    render(<FileList />);

    const textEl = screen.getByText(/파일이 없습니다/i);
    expect(textEl).toBeInTheDocument();
  });

  it("doesn't render '파일이 없습니다 when has children", () => {
    const children = [1, 2, 3, 4, 5];
    render(
      <FileList>
        {children.map((v) => (
          <div key={v}>{v}</div>
        ))}
      </FileList>,
    );

    const textEl = screen.queryByText(/파일이 없습니다/i);
    expect(textEl).not.toBeInTheDocument();
  });

  it("fold when fold button clicked", () => {
    const files = [1, 2, 3];
    render(
      <FileList>
        {files.map((v) => (
          <div key={v}>{v}</div>
        ))}
      </FileList>,
    );
    const fileListHeaderEl = screen.getByTestId(/file-list-header/i);
    const fileListContent = screen.queryByTestId(/file-list-content/i);
    const textEl = screen.queryByText(/파일이 없습니다/i);

    userEvent.click(fileListHeaderEl);

    expect(fileListContent).not.toBeInTheDocument();
    expect(textEl).not.toBeInTheDocument();
  });

  it("unfold when fold button clicked", () => {
    const files = [1, 2, 3];
    render(
      <FileList>
        {files.map((v) => (
          <div key={v}>{v}</div>
        ))}
      </FileList>,
    );
    const fileListHeaderEl = screen.getByTestId(/file-list-header/i);
    const fileListContent = screen.queryByTestId(/file-list-content/i);

    act(() => {
      userEvent.click(fileListHeaderEl);
      userEvent.click(fileListHeaderEl);
    });

    expect(fileListContent).toBeInTheDocument();
  });
});
