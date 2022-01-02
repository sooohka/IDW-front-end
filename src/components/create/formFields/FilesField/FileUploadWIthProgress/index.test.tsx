import { act, screen, render, createWithThemeProvider } from "../../../../../test/test-utils";
import FileUploadWithProgress from ".";
import { FileUploadContext, FileUploadContextType } from "../FileUploadProvider";

describe("src/components/create/formFields/FilesField/FileUploadWIthProgress", () => {
  let fileUploadWithProgressProps: { imageFile: TargetFile; setIsFileUploading: () => void } = {
    imageFile: { errors: [], file: new File([], ""), id: "", isSubmitted: false, url: "" },
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
    fileUploadContextValue = {
      isAccepting: false,
      files: [],
      handleFileDelete: jest.fn(),
      handleFileUpdate: jest.fn(),
      handleFilesAppend: jest.fn(),
      handleSetIsAccepting: jest.fn(),
    };

    fileUploadWithProgressProps = {
      imageFile: {
        errors: [],
        file: new File(["some"], "file.pdf", { type: "application/pdf" }),
        id: "1",
        isSubmitted: false,
        url: "",
      },
      setIsFileUploading: jest.fn(),
    };
  });

  it("match snapshot", () => {
    const component = createWithThemeProvider(
      <FileUploadContext.Provider value={fileUploadContextValue}>
        <FileUploadWithProgress {...fileUploadWithProgressProps} />
      </FileUploadContext.Provider>,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("calls handleFileUpdate when file is uploaded", () => {
    fileUploadWithProgressProps.imageFile = {
      errors: [],
      file: new File(["blooooob"], "file.png", { type: "image/png" }),
      id: "1",
      isSubmitted: false,
      url: "",
    };
    render(
      <FileUploadContext.Provider value={fileUploadContextValue}>
        <FileUploadWithProgress {...fileUploadWithProgressProps} />
      </FileUploadContext.Provider>,
    );

    expect(fileUploadWithProgressProps.setIsFileUploading).toBeCalledTimes(2);
    expect(fileUploadContextValue.handleFileUpdate).toBeCalledTimes(1);
    expect(fileUploadContextValue.handleFileUpdate).toBeCalledWith(
      fileUploadWithProgressProps.imageFile,
    );
  });
  it("doesn't calls uploadFile when file is already submitted", () => {
    fileUploadWithProgressProps.imageFile = {
      errors: [],
      file: new File(["blooooob"], "file.png", { type: "image/png" }),
      id: "1",
      isSubmitted: true,
      url: "",
    };
    render(
      <FileUploadContext.Provider value={fileUploadContextValue}>
        <FileUploadWithProgress {...fileUploadWithProgressProps} />
      </FileUploadContext.Provider>,
    );

    expect(fileUploadContextValue.handleFileUpdate).not.toBeCalled();
  });
  it("doesn't calls uploadFile when file has some error", () => {
    fileUploadWithProgressProps.imageFile = {
      errors: [{ code: "1", message: "has error" }],
      file: new File(["blooooob"], "file.png", { type: "image/png" }),
      id: "1",
      isSubmitted: false,
      url: "",
    };
    render(
      <FileUploadContext.Provider value={fileUploadContextValue}>
        <FileUploadWithProgress {...fileUploadWithProgressProps} />
      </FileUploadContext.Provider>,
    );

    expect(fileUploadContextValue.handleFileUpdate).not.toBeCalled();
  });
  it("renders emptyFile svg when has error", () => {
    fileUploadWithProgressProps.imageFile = {
      errors: [],
      file: new File(["blooooob"], "file.png", { type: "image/png" }),
      id: "1",
      isSubmitted: true,
      url: "",
    };
    render(
      <FileUploadContext.Provider value={fileUploadContextValue}>
        <FileUploadWithProgress {...fileUploadWithProgressProps} />
      </FileUploadContext.Provider>,
    );
    const svgEl = screen.getByTestId(/empty-file-svg/i);
    expect(svgEl).toBeInTheDocument();
  });

  it("renders x-button when has error", () => {
    fileUploadWithProgressProps.imageFile = {
      errors: [{ code: "", message: "error" }],
      file: new File(["blooooob"], "file.png", { type: "image/png" }),
      id: "1",
      isSubmitted: true,
      url: "",
    };
    render(
      <FileUploadContext.Provider value={fileUploadContextValue}>
        <FileUploadWithProgress {...fileUploadWithProgressProps} />
      </FileUploadContext.Provider>,
    );
    const xButton = screen.getByRole("button");
    expect(xButton).toBeInTheDocument();
  });

  it("renders helper text when has error", () => {
    fileUploadWithProgressProps.imageFile = {
      errors: [{ code: "", message: "someThing when wrong" }],
      file: new File(["blooooob"], "file.png", { type: "image/png" }),
      id: "1",
      isSubmitted: true,
      url: "",
    };
    render(
      <FileUploadContext.Provider value={fileUploadContextValue}>
        <FileUploadWithProgress {...fileUploadWithProgressProps} />
      </FileUploadContext.Provider>,
    );
    const helperTextEl = screen.getByRole("note");
    expect(helperTextEl).toBeInTheDocument();
    expect(helperTextEl).toHaveTextContent(/someThing when wrong/i);
  });

  it("render spinner when has no Error and is uploading", () => {
    fileUploadWithProgressProps.imageFile = {
      errors: [],
      file: new File(["blooooob"], "file.png", { type: "image/png" }),
      id: "1",
      isSubmitted: true,
      url: "",
    };
    render(
      <FileUploadContext.Provider value={fileUploadContextValue}>
        <FileUploadWithProgress {...fileUploadWithProgressProps} />
      </FileUploadContext.Provider>,
    );

    const spinnerEl = screen.getByRole("status");
    expect(spinnerEl).toBeInTheDocument();
  });
});
