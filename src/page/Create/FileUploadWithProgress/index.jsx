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
      url: "",
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
        // if (process.env.REACT_APP_ENV !== "local") response = await uploadFile(_file, setProgress);
        const fileDataUri = await new Promise((res, rej) => {
          const reader = new FileReader();
          reader.readAsDataURL(_file);
          reader.onload = () => {
            res(reader.result);
          };
          reader.onabort = (e) => {
            rej(e);
          };
        });

        const { name: fileName, type: contentType } = _file;
        const request = { file: { name: fileName, contentType, dataUri: fileDataUri } };
        if (process.env.REACT_APP_ENV !== "local") {
          response = await axios.post("https://dogemdas2c.execute-api.ap-northeast-2.amazonaws.com/v1", request, {
            onUploadProgress: (prog) => {
              setProgress(Math.round(prog.loaded * 100) / prog.total);
            },
          });
        } else alert("env=local입니다.");
        // TODO:코드 다듬자
        // TODO:코드 다듬자
        // TODO:코드 다듬자
        // TODO:코드 다듬자
        // TODO:코드 다듬자
        // TODO:코드 다듬자
        // TODO:코드 다듬자
        // TODO:코드 다듬자
        // TODO:코드 다듬자
        // TODO:코드 다듬자
        // TODO:코드 다듬자
        // TODO:코드 다듬자
        console.log(response);
        // return;
        // const { url, fullUrl, name } = response.data;
        const {
          message,
          result: { name, ContentType, bucketUrl, locations },
        } = response.data;
        // 요청을 1초에 하나씩 들어갈 수 있도록
        handleSubmittedFiles({ name, url: name });
        setFileInfo((prev) => ({ ...prev, isSubmitting: false, message: "submitted!", file: { ...prev.file, url: `${bucketUrl}${locations.small}` } }));
      } catch (err) {
        console.error(err.message);
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

  return <Template type={file.type} fileInfo={fileInfo} progress={progress} handleDelete={handleDelete} />;
};

FileUploadWithProgress.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleSubmittedFiles: PropTypes.func.isRequired,
  file: PropTypes.instanceOf(File).isRequired,
};
export default FileUploadWithProgress;
