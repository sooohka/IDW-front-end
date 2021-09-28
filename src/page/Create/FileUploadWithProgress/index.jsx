import PropTypes from "prop-types";
import React, { memo, useEffect, useState } from "react";
import Template from "./template";

const FileUploadWithProgress = memo(
  ({ handleDelete, handleUpload, file }) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
      async function upload() {
        const res = await handleUpload(file, setProgress);
      }

      upload();
    }, [handleUpload]);

    return <Template file={file} progress={progress} handleDelete={handleDelete(file.id)} />;
  },
  (prev, next) => {
    if (prev.file !== next.file) return false;
    return true;
  }
);

FileUploadWithProgress.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  file: PropTypes.shape({
    file: PropTypes.shape({
      name: PropTypes.string.isRequired,
      lastModified: PropTypes.number.isRequired,
      lastModifiedDate: PropTypes.instanceOf(Date).isRequired,
      path: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }),
    isSubmitted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    fullUrl: PropTypes.string.isRequired,
    error: PropTypes.shape({ status: PropTypes.bool.isRequired, message: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};
export default FileUploadWithProgress;
