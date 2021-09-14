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

const Template = ({ handleSubmittedFiles, files, isAccepting, dzInputProps, dzRootProps }) => {
  return (
    <Container>
      {/* DropZone */}
      <DropZone isAccepting={isAccepting} {...dzRootProps}>
        <input {...dzInputProps} />
        <p>Drag and Drop files here</p>
      </DropZone>

      {/* ListFiles */}
      <div>
        <ul>
          {files.map((file) => (
            <FileUploadWithProgress
              handleSubmittedFiles={handleSubmittedFiles}
              file={file.file}
              key={`${file.file.name}${file.file.lastModified}${file.file.size}`}
            ></FileUploadWithProgress>
          ))}
        </ul>
      </div>
    </Container>
  );
};

Template.propTypes = {
  handleSubmittedFiles: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({ file: PropTypes.object.isRequired, errors: PropTypes.array.isRequired })).isRequired,
  isAccepting: PropTypes.bool.isRequired,
  dzInputProps: PropTypes.any.isRequired,
  dzRootProps: PropTypes.any.isRequired,
};
export default Template;
