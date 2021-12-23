import { ReactElement } from "react";
import FilesField from ".";
import { createWithThemeProvider } from "../../../../__test__/test-utils";

describe("components/create/formFields/FilesField", () => {
  let FileFieldEL: ReactElement;
  const filesFieldProps: any = {
    handleFilesChange: null,
    isFileUploading: false,
    name: "",
    setIsFileUploading: null,
    error: null,
  };

  beforeEach(() => {
    filesFieldProps.handleFilesChange = jest.fn();
    filesFieldProps.isFileUploading = jest.fn();
    filesFieldProps.name = "files";
    filesFieldProps.setIsFileUploading = jest.fn();
    filesFieldProps.error = undefined;
    FileFieldEL = <FilesField {...filesFieldProps} />;
  });
  it("renders", () => {
    const component = createWithThemeProvider(FileFieldEL);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
