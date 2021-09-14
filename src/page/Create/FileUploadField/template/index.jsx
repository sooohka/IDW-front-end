import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FileUploadWithProgress from "../../FileUploadWithProgress";

const Container = styled.div`
  height: fit-content;
`;

const DropZone = styled.div`
  border: 3px solid rebeccapurple;
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${({ isAccepting }) => isAccepting && 0.3};
`;

const Template = ({ handleDelete, handleSubmittedFiles, files, isAccepting, dzInputProps, dzRootProps }) => {
  return (
    <Container>
      {/* DropZone */}
      <DropZone isAccepting={isAccepting} {...dzRootProps}>
        <input {...dzInputProps} />
        <p>Drag and Drop files here</p>
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
  dzInputProps: PropTypes.any.isRequired,
  dzRootProps: PropTypes.any.isRequired,
};
export default Template;
