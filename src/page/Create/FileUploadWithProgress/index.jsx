import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Template from "./template";

const FileUploadWithProgress = ({ handleSubmittedFiles, file }) => {
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(true);

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
        const fileName = `${name}.${format}`;
        handleSubmittedFiles({ fileName, url });
      })
      .catch((res) => {
        setSubmitted(false);
        console.log(res.response.data.error.message);
      });
  }, []);

  const handleDelete = useCallback(() => {}, []);

  useEffect(() => {
    async function upload() {
      await handleUpload(file);
    }
    upload();
  }, []);

  return <Template submitted={submitted} progress={progress} handleDelete={handleDelete}></Template>;
};

FileUploadWithProgress.propTypes = {
  handleSubmittedFiles: PropTypes.func.isRequired,
  file: PropTypes.shape({}).isRequired,
};
export default FileUploadWithProgress;
