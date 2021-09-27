import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Template from "./template";

const FileUploadWithProgress = ({ handleDelete, handleUpload, file }) => {
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [fileInfo, setFileInfo] = useState({
    file: {
      name: "",
      lastModified: 0,
      lastModifiedDate: new Date(0),
      path: "",
      size: 0,
      type: "",
    },
    hasError: false,
    message: "submitting...",
    url: "",
  });

  useEffect(() => {
    async function upload() {
      const res = await handleUpload(file, setProgress);
      setFileInfo(res);
      setIsSubmitting(false);
    }

    upload();
  }, [file, handleUpload]);

  return <Template isSubmitting={isSubmitting} type={file.type} fileInfo={fileInfo} progress={progress} handleDelete={handleDelete} />;
};

FileUploadWithProgress.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  file: PropTypes.instanceOf(File).isRequired,
};
export default FileUploadWithProgress;
