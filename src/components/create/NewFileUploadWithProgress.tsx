import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as FileImage } from "../../assets/icons/file-image-regular.svg";
import { ReactComponent as Spinner } from "../../assets/icons/spinner.svg";
import useMount from "../../utils/hooks/useMount";
import { handleAwsUpload, handleCloudinaryUpload } from "../../utils/lib/file";
import HelperText from "../common/HelperText";
import Img from "../common/Img";
import ProgressBar from "../common/ProgressBar";
import XButton from "../common/XButton";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
`;

const ProgressWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 0 1rem;
  width: 100%;
`;

const handleUpload =
  process.env.NODE_ENV === "development" ? handleCloudinaryUpload : handleAwsUpload;

interface IProps {
  handleDelete: (id: string) => (e: React.MouseEvent) => void;
  imageFile: AwsImageFile;
  setImageFiles: React.Dispatch<React.SetStateAction<AwsImageFile[]>>;
}

const NewFileUploadWithProgress: React.FC<IProps> = ({
  handleDelete,
  imageFile,
  setImageFiles,
}) => {
  const { isMount } = useMount();
  const { errors, file, id, isSubmitted, url } = imageFile;
  const [progress, setProgress] = useState(0);

  const fullUrl = url;

  useEffect(() => {
    if (isMount) handleUpload(imageFile, setProgress, setImageFiles);
  }, [setImageFiles, imageFile, isMount]);
  return (
    <Container>
      {isSubmitted ? (
        <Img width='50px' height='50px' src={fullUrl} alt={file.name} />
      ) : (
        <FileImage width={50} height={50} />
      )}
      <Wrapper>
        <ProgressWrapper>
          <ProgressBar title={file.name} hasError={errors.length > 0} progress={progress} />
          {isSubmitted ? <XButton onClick={handleDelete(id)} /> : <Spinner />}
        </ProgressWrapper>
        <HelperText hasError={errors.length > 0} text={errors[0] && "submitted"} />
      </Wrapper>
    </Container>
  );
};

export default NewFileUploadWithProgress;
