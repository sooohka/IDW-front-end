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
    if (rejectedFiles.length > 0) alert("같은이름의 파일은 제외하고 업로드하겠습니다.");
    const formedAcceptedFiles = acceptedFiles.map((file) => file);
    setFiles((prev) => [...prev, ...formedAcceptedFiles]);
  }, []);

  const onDragEnter = useCallback(() => {
    setIsAccepting(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsAccepting(false);
  }, []);

  const handleSubmittedFiles = useCallback((submittedFile) => {
    setSubmittedFiles((prev) => [...prev, submittedFile]);
  }, []);

  const handleValidation = useCallback((_file) => {
    if (files.find((file) => file.name === _file.name)) {
      return { message: "같은 이름의 파일이 이미 존재합니다." };
    }
    // TODO: file size validation
    return null;
  });

  const handleDelete = useCallback(
    (fileName) => (e) => {
      setFiles((prev) => prev.filter((file) => file.name !== fileName));
      setSubmittedFiles((prev) => prev.filter((file) => file.name !== fileName));
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop, onDragEnter, onDragLeave, validator: handleValidation });
  const dzRootProps = getRootProps();
  const dzInputProps = getInputProps();
  return (
    <>
      <Template
        handleDelete={handleDelete}
        handleSubmittedFiles={handleSubmittedFiles}
        handleValidation={handleValidation}
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
