import FileUploadField from ".";
import { act, createWithThemeProvider, render } from "../../../../../__test__/test-utils";
import { FileUploadContext, FileUploadContextType } from "../FileUploadProvider";

describe("src/components/create/formFields/FilesField/FileUploadField", () => {
  let fileUploadFieldProps = {
    handleFilesChange: () => {},
    isFileUploading: false,
    setIsFileUploading: () => {},
  };

  let fileUploadContextValue: FileUploadContextType = {
    isAccepting: false,
    files: [],
    handleFileDelete: () => {},
    handleFileUpdate: () => {},
    handleFilesAppend: () => {},
    handleSetIsAccepting: () => {},
  };

  beforeEach(() => {
    fileUploadFieldProps = {
      handleFilesChange: jest.fn(),
      isFileUploading: false,
      setIsFileUploading: jest.fn(),
    };
    fileUploadContextValue = {
      files: [],
      isAccepting: false,
      handleFileDelete: jest.fn(),
      handleFileUpdate: jest.fn(),
      handleFilesAppend: jest.fn(),
      handleSetIsAccepting: jest.fn(),
    };
  });

  it("matches snapshot", () => {
    const component = createWithThemeProvider(<FileUploadField {...fileUploadFieldProps} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("doesn't update formik's files property when file is uploading to img server", () => {
    fileUploadFieldProps.isFileUploading = true;

    act(() => {
      render(
        <FileUploadContext.Provider value={fileUploadContextValue}>
          <FileUploadField {...fileUploadFieldProps} />
        </FileUploadContext.Provider>,
      );
    });

    expect(fileUploadFieldProps.handleFilesChange).not.toBeCalledTimes(1);
  });

  it("doesn't update formik's files property when file is not yet submitted ", () => {
    const file = new File(["blob"], "apple.png", { type: "image/png" });
    fileUploadContextValue.files = [{ errors: [], file, id: "1", isSubmitted: false, url: "" }];
    render(
      <FileUploadContext.Provider value={fileUploadContextValue}>
        <FileUploadField {...fileUploadFieldProps} />
      </FileUploadContext.Provider>,
    );
    expect(fileUploadFieldProps.handleFilesChange).not.toBeCalledTimes(1);
  });

  it("doesn't update formik's files property when some file has error", () => {
    const file = new File(["blob"], "apple.png", { type: "image/png" });
    fileUploadContextValue.files = [
      { errors: [{ code: "error", message: "error" }], file, id: "1", isSubmitted: true, url: "" },
    ];
    render(
      <FileUploadContext.Provider value={fileUploadContextValue}>
        <FileUploadField {...fileUploadFieldProps} />
      </FileUploadContext.Provider>,
    );
    expect(fileUploadFieldProps.handleFilesChange).not.toBeCalledTimes(1);
  });

  it("update formik's files property when single file that is submitted and has no error submitted", () => {
    const file = new File(["blob"], "apple.png", { type: "image/png" });
    fileUploadContextValue.files = [{ errors: [], file, id: "1", isSubmitted: true, url: "" }];
    render(
      <FileUploadContext.Provider value={fileUploadContextValue}>
        <FileUploadField {...fileUploadFieldProps} />
      </FileUploadContext.Provider>,
    );

    expect(fileUploadFieldProps.handleFilesChange).toBeCalledTimes(1);
  });

  it("update formik's files property when multiple files that is submitted and has no error submitted", () => {
    const file = new File(["blob"], "apple.png", { type: "image/png" });
    const file2 = new File(["blob"], "banana.png", { type: "image/png" });
    fileUploadContextValue.files = [
      { errors: [], file, id: "1", isSubmitted: true, url: "" },
      { errors: [], file: file2, id: "2", isSubmitted: true, url: "" },
    ];
    render(
      <FileUploadContext.Provider value={fileUploadContextValue}>
        <FileUploadField {...fileUploadFieldProps} />
      </FileUploadContext.Provider>,
    );

    expect(fileUploadFieldProps.handleFilesChange).toBeCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: "apple.png" }),
        expect.objectContaining({ name: "banana.png" }),
      ]),
    );
    expect(fileUploadFieldProps.handleFilesChange).toBeCalledTimes(1);
  });

  it("gets multiple files that some are not submitted or has error", () => {
    const file = new File(["blob"], "apple.png", { type: "image/png" });
    const file2 = new File(["blob"], "banana.png", { type: "image/png" });
    const file3 = new File(["blob"], "carrot.png", { type: "image/png" });
    fileUploadContextValue.files = [
      { errors: [], file, id: "1", isSubmitted: false, url: "" },
      { errors: [], file: file2, id: "2", isSubmitted: true, url: "" },
      { errors: [], file: file3, id: "3", isSubmitted: true, url: "" },
    ];
    render(
      <FileUploadContext.Provider value={fileUploadContextValue}>
        <FileUploadField {...fileUploadFieldProps} />
      </FileUploadContext.Provider>,
    );

    expect(fileUploadFieldProps.handleFilesChange).not.toBeCalled();
  });
});
