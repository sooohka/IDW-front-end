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
      let uploadedFile: TargetFile;
      if (process.env.NODE_ENV === "test") uploadedFile = { ...imageFile };
      else uploadedFile = await handleUpload(imageFile, setProgress);
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
      {errors.length > 0 || progress !== 100 ? (
        <EmptyFile data-testid='empty-file-svg' width={50} height={50} />
      ) : (
        <FileImage />
      )}
      <S.ProgressBar>
        <S.ProgressWrapper>
          <ProgressBar title={file.name} hasError={errors.length > 0} progress={progress} />
          {errors.length > 0 || progress === 100 ? (
            <XButton data-testid='x-button' onClick={() => handleFileDelete(id)} />
          ) : (
            <Spinner role='status' />
          )}
        </S.ProgressWrapper>
        {progress === 100 ||
          (errors.length > 0 && (
            <HelperText hasError={errors.length > 0}>
              {"submitted" && errors[0]?.message}
            </HelperText>
          ))}
      </S.ProgressBar>
    </S.FileUploadWithProgress>
  );
};

export default FileUploadWithProgress;
