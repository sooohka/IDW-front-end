import PropTypes from "prop-types";
import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import HelperText from "../common/HelperText";
import Img from "../common/Img";
import ProgressBar from "../common/ProgressBar";
import { ReactComponent as Spinner } from "../../assets/icons/spinner.svg";
import { ReactComponent as FileImage } from "../../assets/icons/file-image-regular.svg";
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

const FileUploadWithProgress = ({ handleDelete, handleUpload, file }) => {
  const [progress, setProgress] = useState(0);
  const {
    file: { name, lastModified, lastModifiedDate, path, size, type },
    isSubmitted,
    id,
    url,
    fullUrl,
    error: { status: errorStatus, message },
  } = file;

  useEffect(() => {
    async function upload() {
      const res = await handleUpload(file, setProgress);
    }
    upload();
  }, [handleUpload]);
  console.log(isSubmitted);

  return (
    <Container onClick={(e) => e.preventDefault()}>
      {isSubmitted ? <Img width="50px" height="50px" src={fullUrl} alt={name} /> : <FileImage width={50} height={50} />}
      <Wrapper>
        <ProgressWrapper>
          <ProgressBar title={name} hasError={errorStatus} progress={progress} />
          {isSubmitted ? <XButton onClick={handleDelete(id)} /> : <Spinner />}
        </ProgressWrapper>
        <HelperText always hasError={errorStatus} text={message} />
      </Wrapper>
    </Container>
  );
  // <Template file={file} progress={progress} handleDelete={handleDelete(file.id)} />;
};

FileUploadWithProgress.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  file: PropTypes.shape({
    file: PropTypes.shape({
      name: PropTypes.string.isRequired,
      lastModified: PropTypes.number.isRequired,
      lastModifiedDate: PropTypes.instanceOf(Date).isRequired,
      path: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }),
    isSubmitted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    fullUrl: PropTypes.string.isRequired,
    error: PropTypes.shape({ status: PropTypes.bool.isRequired, message: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};
export default FileUploadWithProgress;
