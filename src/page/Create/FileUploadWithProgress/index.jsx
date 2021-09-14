import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Template from "./template";

const FileUploadWithProgress = ({ handleDelete, handleSubmittedFiles, file }) => {
  const [progress, setProgress] = useState(0);
  const [submitResult, setSubmitResult] = useState({ isSubmitting: true, hasError: false, message: "submitting..." });

  const handleUpload = useCallback(async (_file) => {
    const formData = new FormData();

    formData.append("upload_preset", "docs_upload_example_us_preset");
    formData.append("file", _file);

    axios
      .post("https://api.cloudinary.com/v1_1/demo/image/upload", formData, {
        onUploadProgress: (prog) => {
          const { loaded } = prog;
          const { total } = prog;
          setProgress(Math.round((loaded / total) * 100));
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { url, original_filename: name, format } = res.data;
        handleSubmittedFiles({ name: `${name}.${format}`, url });
        setSubmitResult({ isSubmitting: false, hasError: false, message: "submitted!" });
      })
      .catch((res) => {
        const { message } = res.response.data.error;
        setSubmitResult({ isSubmitting: false, hasError: true, message });
        console.log(res.response.data.error.message);
      });
  }, []);

  useEffect(() => {
    async function upload() {
      await handleUpload(file);
    }
    upload();
  }, []);

  return <Template fileName={file.name} submitResult={submitResult} progress={progress} handleDelete={handleDelete}></Template>;
};

FileUploadWithProgress.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleSubmittedFiles: PropTypes.func.isRequired,
  file: PropTypes.instanceOf(File).isRequired,
};
export default FileUploadWithProgress;
