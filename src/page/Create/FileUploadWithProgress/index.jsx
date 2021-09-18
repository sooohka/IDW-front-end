import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Template from "./template";
import { uploadFile } from "../../../aws";

const FileUploadWithProgress = ({ handleDelete, handleSubmittedFiles, file }) => {
  const [progress, setProgress] = useState(0);
  const [fileInfo, setFileInfo] = useState({
    file: {
      name: file.name,
      url: "",
    },
    isSubmitting: true,
    hasError: false,
    message: "submitting...",
  });

  const handleUpload = useCallback(
    async (_file) => {
      try {
        const response = await uploadFile(_file, setProgress);

        // const formData = new FormData();

        // formData.append("upload_preset", "docs_upload_example_us_preset");
        // formData.append("file", _file);
        // try {
        //   const response = await axios.post("https://api.cloudinary.com/v1_1/demo/image/upload", formData, {
        //     onUploadProgress: (prog) => {
        //       const { loaded } = prog;
        //       const { total } = prog;
        //       setProgress(Math.round((loaded / total) * 100));
        //     },
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   });

        const { url, name } = response.data;

        handleSubmittedFiles({ name, url });
        setFileInfo((prev) => ({ ...prev, isSubmitting: false, message: "submitted!", file: { ...prev.file, url } }));
      } catch (err) {
        console.log(err.message);
        // TODO: fileUploadWithProgress error handling
        const message = err.response?.data?.error?.message || "something went wrong😅 ";
        setFileInfo((prev) => ({ isSubmitting: false, hasError: true, message, file: { ...prev.file } }));
      }
    },
    [handleSubmittedFiles]
  );

  useEffect(() => {
    async function upload() {
      await handleUpload(file);
    }
    upload();
  }, [file, handleUpload]);

  return <Template type={file.type} fileInfo={fileInfo} progress={progress} handleDelete={handleDelete}></Template>;
};

FileUploadWithProgress.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleSubmittedFiles: PropTypes.func.isRequired,
  file: PropTypes.instanceOf(File).isRequired,
};
export default FileUploadWithProgress;
