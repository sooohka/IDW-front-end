import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { act } from "react-dom/test-utils";
import { createWithThemeProvider, render, screen } from "../../../../test-utils";
import FilesField from "../FilesField";
import DropZone from "../FilesField/DropZone";
import { FileUploadContext } from "../FilesField/FileUploadProvider";

describe("components/create/formFields", () => {
  describe("FilesField", () => {
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

  describe("DropZone", () => {
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
});
