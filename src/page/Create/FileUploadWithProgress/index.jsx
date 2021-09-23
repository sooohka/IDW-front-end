import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Template from "./template";
import { uploadFile } from "../../../api/aws";

const FileUploadWithProgress = ({ handleDelete, handleSubmittedFiles, file }) => {
  const [progress, setProgress] = useState(0);
  const [fileInfo, setFileInfo] = useState({
    file: {
      name: file.name,
      thumbnail: {
        smallImage: "",
        largeImage: "",
        lowQualityImage: "",
        originalImage: "",
      },
    },
    isSubmitting: true,
    hasError: false,
    message: "submitting...",
  });

  const handleUpload = useCallback(
    async (_file) => {
      try {
        let response;
        // aws 사용
        if (process.env.REACT_APP_ENV === "production") {
          // TODO: category 추가해서 업로드할 수 있도록
          response = await uploadFile(_file, setProgress);
        } else {
          const formData = new FormData();

          formData.append("upload_preset", "docs_upload_example_us_preset");
          formData.append("file", _file);

          response = await axios.post("https://api.cloudinary.com/v1_1/demo/image/upload", formData, {
            onUploadProgress: ({ loaded, total }) => setProgress(Math.round((loaded / total) * 100)),
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        // aws
        const { thumbnail, name } = response.data;
        console.log(JSON.stringify(response.data));

        // FIXME:클라우드너리 최대한 안씀
        handleSubmittedFiles({ name, thumbnail });
        setFileInfo((prev) => ({ ...prev, isSubmitting: false, message: "submitted!", file: { ...prev.file, thumbnail } }));
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
