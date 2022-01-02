import { FileRejection, useDropzone } from "react-dropzone";
import * as uuid from "uuid";
import UploadIcon from "../../../../../assets/icons/cloud-upload-alt-solid.svg";
import defaultTheme from "../../../../../style/theme";
import { useFileUploadContext } from "../FileUploadProvider";
import * as S from "./Style";

const DropZone: React.FC = () => {
  const { files, isAccepting, handleSetIsAccepting, handleFilesAppend } = useFileUploadContext();
  const onDragEnter = () => {
    handleSetIsAccepting(true);
  };

  const onDragLeave = () => {
    handleSetIsAccepting(false);
  };

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    handleSetIsAccepting(true);
    const accFiles = acceptedFiles.map((acceptedFile) => ({
      file: acceptedFile,
      errors: [],
      id: uuid.v4(),
      isSubmitted: false,
      url: "",
    }));

    const rejFiles = rejectedFiles.map((rejectedFile) => ({
      file: rejectedFile.file,
      errors: rejectedFile.errors,
      id: uuid.v4(),
      isSubmitted: false,
      url: "",
    }));
    handleFilesAppend([...accFiles, ...rejFiles]);
    handleSetIsAccepting(false);
  };

  const handleValidation = (file: File) => {
    if (files.find((imageFile) => imageFile.file.name === file.name)) {
      return {
        code: "duplicate-file",
        message: "중복된 파일은 허용이 안됩니다.",
      };
    }
    if (file.size / 1024 / 1024 > 5)
      return {
        code: "file-too-large",
        message: `파일은 5mb를 넘을 수 없습니다`,
      };
    return null;
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 50,
    onDrop,
    onDragEnter,
    onDragLeave,
    validator: handleValidation,
  });
  return (
    <S.DropZone {...getRootProps()} isAccepting={isAccepting}>
      <input data-testid='dropzone-input' {...getInputProps()} />
      <UploadIcon fill={defaultTheme.colors.primary} width={50} height={50} />
      <p>Drag and Drop or click here to upload</p>
    </S.DropZone>
  );
};

export default DropZone;
