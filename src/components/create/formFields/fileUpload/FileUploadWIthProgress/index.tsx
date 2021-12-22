import React, { useEffect, useState } from "react";
import { ReactComponent as UploadFail } from "../../../../../assets/icons/file-excel-regular.svg";
import { ReactComponent as FileImage } from "../../../../../assets/icons/file-image-regular.svg";
import { ReactComponent as Spinner } from "../../../../../assets/icons/spinner.svg";
import { handleAwsUpload, handleCloudinaryUpload } from "../../../../../utils/lib/file";
import HelperText from "../../../../common/HelperText";
import Img from "../../../../common/Img";
import ProgressBar from "../../../../common/ProgressBar";
import XButton from "../../../../common/XButton";
import * as S from "./Style";

const handleUpload =
  process.env.NODE_ENV === "development" ? handleCloudinaryUpload : handleAwsUpload;
interface IProps {
  handleDelete: (id: string) => (e: React.MouseEvent) => void;
  imageFile: TargetFile;
  setImageFiles: React.Dispatch<React.SetStateAction<TargetFile[]>>;
}

const FileUploadWithProgress: React.FC<IProps> = ({ handleDelete, imageFile, setImageFiles }) => {
  const { errors, file, id, isSubmitted, url } = imageFile;
  const [progress, setProgress] = useState(0);

  const fullUrl = url;

  useEffect(() => {
    if (!imageFile.errors.length) handleUpload(imageFile, setProgress, setImageFiles);
    else setImageFiles((prev) => prev.map((f) => ({ ...f, isSubmitted: true })));
  }, [setImageFiles, imageFile]);

  return (
    <S.FileUploadWithProgress>
      {isSubmitted ? (
        <>
          {errors.length === 0 && <Img width='50px' height='50px' src={fullUrl} alt={file.name} />}
          {errors.length > 0 && <UploadFail width={50} height={50} color='red' />}
        </>
      ) : (
        <FileImage width={50} height={50} />
      )}
      <S.ProgressBar>
        <S.ProgressWrapper>
          <ProgressBar title={file.name} hasError={errors.length > 0} progress={progress} />
          {isSubmitted ? <XButton onClick={handleDelete(id)} /> : <Spinner />}
        </S.ProgressWrapper>
        <HelperText hasError={errors.length > 0} text={"submitted" && errors[0]?.message} />
      </S.ProgressBar>
    </S.FileUploadWithProgress>
  );
};

export default FileUploadWithProgress;
