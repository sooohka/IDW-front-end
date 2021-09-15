import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FileUploadWithProgress from "../../FileUploadWithProgress";
import { ReactComponent as UploadIcon } from "../../../../assets/icons/cloud-upload-alt-solid.svg";
import { theme } from "../../../../style/theme";

const Container = styled.div`
  height: fit-content;
`;

const DropZone = styled.div`
  border: 3px dashed;
  border-color: ${() => theme.colors.secondary};
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-direction: column;
  & > * {
    transform: ${({ isAccepting }) => isAccepting && "scale(1.5)"};
    opacity: ${({ isAccepting }) => isAccepting && 0.3};
  }
  & > p {
    font-weight: bold;
    color: ${() => theme.colors.secondary};
  }
`;

const Template = ({ handleDelete, handleSubmittedFiles, files, isAccepting, getInputProps, getRootProps }) => {
  return (
    <Container>
      {/* DropZone */}
      <DropZone isAccepting={isAccepting} {...getRootProps()} onClick={(e) => e.stopPropagation()}>
        <input {...getInputProps()} />
        <UploadIcon fill={theme.colors.secondary} width={50} height={50}></UploadIcon>
        <p>Drag and Drop or click here to upload</p>
      </DropZone>

      {/* ListFiles */}
      <div>
        {files.map((file) => (
          <FileUploadWithProgress
            handleDelete={handleDelete}
            handleSubmittedFiles={handleSubmittedFiles}
            file={file}
            key={`${file.name}${file.size}`}
          ></FileUploadWithProgress>
        ))}
      </div>
    </Container>
  );
};

Template.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleSubmittedFiles: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape(PropTypes.object.isRequired)).isRequired,
  isAccepting: PropTypes.bool.isRequired,
  getRootProps: PropTypes.func.isRequired,
  getInputProps: PropTypes.func.isRequired,
};
export default Template;
