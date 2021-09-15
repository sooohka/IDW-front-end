import { useField } from "formik";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import useMount from "../../../utils/hooks/useMount";
import useTraceUpdate from "../../../utils/hooks/useTraceComponent";
import Template from "./template";

const FileUploadField = (props) => {
  const { handleImgUploading, name } = props;
  const [, , helpers] = useField(name);
  const [files, setFiles] = useState([]);
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [isAccepting, setIsAccepting] = useState(false);
  const { isMount } = useMount();

  useEffect(() => {
    // console.log(files);
    // console.log(submittedFiles);
    // console.log(helpers);
    console.log(`%c fileUploadField rendered`, "background-color:pink;font-size:15px;font-weight:bold;color:black");
  });

  useEffect(() => {
    console.log(isMount);

    if (isMount) return;

    helpers.setValue(submittedFiles);
  }, [submittedFiles, isMount]);

  useEffect(() => {
    console.log("files");
  }, [files]);
  useEffect(() => {
    console.log("sUmittedfiles");
  }, [submittedFiles]);
  useEffect(() => {
    console.log("isAccepting");
  }, [isAccepting]);
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log("ondrop");

    // TODO: 에러메시지 개선

    if (rejectedFiles.length > 0) alert(rejectedFiles[0].errors[0].message);
    const formedAcceptedFiles = acceptedFiles.map((file) => file);
    setFiles((prev) => [...prev, ...formedAcceptedFiles]);
    setIsAccepting(false);
  }, []);

  const onDragEnter = useCallback(() => {
    console.log("dragenter");

    setIsAccepting(true);
  }, []);

  const onDragLeave = useCallback(() => {
    console.log("dragLeave");
    setIsAccepting(false);
  }, []);

  const handleSubmittedFiles = useCallback((submittedFile) => {
    console.log("handleSubmiitedFiles");
    setSubmittedFiles((prev) => [...prev, submittedFile]);
  }, []);

  const handleValidation = useCallback(
    (_file) => {
      // if (!_file.type.startsWith("image")) return { message: "jpg,png,gif파일만 업로드하겠습니다." };
      if (files.find((file) => file.name === _file.name)) {
        return { message: "같은 이름의 파일은 제외하고 업로드하겠습니다." };
      }

      if (files.length > 5) return { message: "파일은 5장까지 업로드 가능합니다." };
      // TODO: file size validation
      return null;
    },
    [files]
  );

  const handleDelete = useCallback(
    (fileName) => (e) => {
      setFiles((prev) => prev.filter((file) => file.name !== fileName));
      setSubmittedFiles((prev) => prev.filter((file) => file.name !== fileName));
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    // accept: "image/*",
    maxFiles: 50,
    onDrop,
    onDragEnter,
    onDragLeave,
    validator: handleValidation,
  });

  return (
    <Template
      handleDelete={handleDelete}
      handleSubmittedFiles={handleSubmittedFiles}
      handleValidation={handleValidation}
      files={files}
      isAccepting={isAccepting}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
    ></Template>
  );
};

FileUploadField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FileUploadField;
