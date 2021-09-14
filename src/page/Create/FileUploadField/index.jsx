import { useField } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { DropzoneState, useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import Template from "./template";

const FileUploadField = ({ name }) => {
  const [, , helpers] = useField(name);
  const [files, setFiles] = useState([]);
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [isAccepting, setIsAccepting] = useState(false);

  useEffect(() => {
    helpers.setValue(submittedFiles);
  }, [submittedFiles]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const formedAcceptedFiles = acceptedFiles.map((file) => ({ file, errors: [] }));
    setFiles((prev) => [...prev, ...formedAcceptedFiles, ...rejectedFiles]);
  }, []);

  const handleSubmittedFiles = useCallback((submittedFile) => {
    setSubmittedFiles((prev) => [...prev, submittedFile]);
  }, []);

  const onDragEnter = useCallback(() => {
    setIsAccepting(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsAccepting(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, onDragEnter, onDragLeave });
  const dzRootProps = getRootProps();
  const dzInputProps = getInputProps();
  return (
    <>
      <Template
        handleSubmittedFiles={handleSubmittedFiles}
        files={files}
        isAccepting={isAccepting}
        dzRootProps={dzRootProps}
        dzInputProps={dzInputProps}
      ></Template>
    </>
  );
};

FileUploadField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FileUploadField;
