import { ReactElement } from "react";
import userEvent from "@testing-library/user-event";
import DropZone from "./index";
import { render, screen, act, createWithThemeProvider } from "../../../../../test/test-utils";
import { FileUploadContext } from "../FileUploadProvider";

describe("components/create/formFields/FilesField/DropZone", () => {
  let DropZoneEl: ReactElement;
  let providerValue: {
    files: TargetFile[];
    isAccepting: boolean;
    handleFileDelete: (id: string) => void;
    handleFilesAppend: (files: TargetFile[]) => void;
    handleSetIsAccepting: (isAccepting: boolean) => void;
    handleFileUpdate: (file: TargetFile) => void;
  };

  beforeEach(() => {
    DropZoneEl = <DropZone />;
    providerValue = {
      files: [],
      isAccepting: false,
      handleFileDelete: jest.fn(),
      handleFilesAppend: jest.fn(),
      handleSetIsAccepting: jest.fn(),
      handleFileUpdate: jest.fn(),
    };
  });

  it("matches snapshot", () => {
    const component = createWithThemeProvider(<DropZone />);

    expect(component.toJSON()).toMatchSnapshot();
  });
  it("upload single file", async () => {
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    render(
      <FileUploadContext.Provider value={providerValue}>{DropZoneEl}</FileUploadContext.Provider>,
    );
    const inputEL = screen.getByTestId("dropzone-input") as HTMLInputElement;

    await act(async () => {
      userEvent.upload(inputEL, file);
    });

    const param = expect.arrayContaining([
      expect.objectContaining({ file: expect.objectContaining({ path: "hello.png" }) }),
    ]);
    expect(providerValue.handleFilesAppend).toBeCalledTimes(1);
    expect(providerValue.handleFilesAppend).toHaveBeenCalledWith(param);
    expect(providerValue.handleSetIsAccepting).toBeCalledTimes(2);
  });

  it("upload multiple files", async () => {
    const files = [
      new File(["blobbbbba"], "apple.jpeg", { type: "image/jpeg" }),
      new File(["blobbbbbb"], "banana.png", { type: "image/png" }),
    ];
    render(
      <FileUploadContext.Provider value={providerValue}>{DropZoneEl}</FileUploadContext.Provider>,
    );
    const inputEL = screen.getByTestId("dropzone-input") as HTMLInputElement;

    await act(async () => {
      userEvent.upload(inputEL, files);
    });

    const param = expect.arrayContaining([
      expect.objectContaining({ file: expect.objectContaining({ path: "apple.jpeg" }) }),
      expect.objectContaining({ file: expect.objectContaining({ path: "banana.png" }) }),
    ]);
    expect(providerValue.handleFilesAppend).toBeCalledWith(param);
    expect(providerValue.handleFilesAppend).toBeCalledTimes(1);
    expect(providerValue.handleSetIsAccepting).toBeCalledTimes(2);
  });

  it("upload file size above 5mb", async () => {
    const file = new File(["blob"], "hi.png", { type: "image/png" });
    Object.defineProperty(file, "size", { value: 1024 * 1024 * 6 });
    render(
      <FileUploadContext.Provider value={providerValue}>{DropZoneEl}</FileUploadContext.Provider>,
    );
    const inputEL = screen.getByTestId("dropzone-input") as HTMLInputElement;

    await act(async () => {
      userEvent.upload(inputEL, file);
    });

    const param = expect.arrayContaining([
      expect.objectContaining({
        errors: expect.arrayContaining([expect.objectContaining({ code: "file-too-large" })]),
        file: expect.objectContaining({
          path: "hi.png",
        }),
      }),
    ]);
    expect(providerValue.handleFilesAppend).toBeCalledWith(param);
    expect(providerValue.handleFilesAppend).toBeCalledTimes(1);
    expect(providerValue.handleSetIsAccepting).toBeCalledTimes(2);
  });

  it("upload not supported file with file size above 5mb", async () => {
    const file = new File(["pdf blob"], "qwe.pdf", { type: "application/pdf" });
    Object.defineProperty(file, "size", { value: 1024 * 1024 * 6 });
    render(
      <FileUploadContext.Provider value={providerValue}>{DropZoneEl}</FileUploadContext.Provider>,
    );
    const inputEl = screen.getByTestId("dropzone-input") as HTMLInputElement;

    await act(async () => {
      userEvent.upload(inputEl, file);
    });

    const param = expect.arrayContaining([
      expect.objectContaining({
        file: expect.objectContaining({ path: "qwe.pdf" }),
        errors: expect.arrayContaining([
          expect.objectContaining({ code: "file-invalid-type" }),
          expect.objectContaining({ code: "file-too-large" }),
        ]),
      }),
    ]);
    expect(providerValue.handleFilesAppend).toBeCalledWith(param);
    expect(providerValue.handleSetIsAccepting).toBeCalledTimes(2);
  });
});
