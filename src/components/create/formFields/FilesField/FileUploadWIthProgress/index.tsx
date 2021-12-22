import React, { useCallback, useEffect, useState } from "react";
import { ReactComponent as UploadFail } from "../../../../../assets/icons/file-excel-regular.svg";
import { ReactComponent as EmptyFile } from "../../../../../assets/icons/file-image-regular.svg";
import { ReactComponent as Spinner } from "../../../../../assets/icons/spinner.svg";
import { handleAwsUpload, handleCloudinaryUpload } from "../../../../../utils/lib/file";
import HelperText from "../../../../common/HelperText";
import Img from "../../../../common/Img";
import ProgressBar from "../../../../common/ProgressBar";
import XButton from "../../../../common/XButton";
import { useFileUploadContext } from "../FileUploadProvider";
import * as S from "./Style";

const handleUpload =
  process.env.NODE_ENV === "development" ? handleCloudinaryUpload : handleAwsUpload;
interface IProps {
  imageFile: TargetFile;
  setIsFileUploading: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileUploadWithProgress: React.FC<IProps> = ({ imageFile, setIsFileUploading }) => {
  const { handleFileDelete, handleFileUpdate } = useFileUploadContext();
  const { errors, file, id, isSubmitted, url } = imageFile;
  const [progress, setProgress] = useState(0);

  const uploadFile = useCallback(async () => {
    setIsFileUploading(true);
    try {
      const uploadedFile = await handleUpload(imageFile, setProgress);
      handleFileUpdate(uploadedFile);
    } catch (e) {
      // retry
    }
    setIsFileUploading(false);
  }, [handleFileUpdate, imageFile, setIsFileUploading]);

  useEffect(() => {
    if (isSubmitted) return;
    if (errors.length) return;
    uploadFile();
  }, [errors, isSubmitted, uploadFile]);

  const FileImage = () =>
    isSubmitted ? (
      <Img width='50px' height='50px' src={url} alt={file.name} />
    ) : (
      <UploadFail width={50} height={50} color='red' />
    );
  return (
    <S.FileUploadWithProgress>
      {progress === 100 ? <FileImage /> : <EmptyFile width={50} height={50} />}
      <S.ProgressBar>
        <S.ProgressWrapper>
          <ProgressBar title={file.name} hasError={errors.length > 0} progress={progress} />
          {errors.length > 0 || progress === 100 ? (
            <XButton onClick={() => handleFileDelete(id)} />
          ) : (
            <Spinner />
          )}
        </S.ProgressWrapper>
        <HelperText hasError={errors.length > 0} text={"submitted" && errors[0]?.message} />
      </S.ProgressBar>
    </S.FileUploadWithProgress>
  );
};

export default FileUploadWithProgress;
