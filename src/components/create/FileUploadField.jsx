import axios from "axios";
import { useField } from "formik";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import uuid from "uuid";
import styled, { css } from "styled-components";
import theme from "../../style/theme";
import useMount from "../../utils/hooks/useMount";
import { readAsDataUrl } from "../../utils/lib/file";
import { ReactComponent as UploadIcon } from "../../assets/icons/cloud-upload-alt-solid.svg";
import { ReactComponent as Sort } from "../../assets/icons/sort-up-solid.svg";
import FileUploadWithProgress from "./FileUploadWithProgress";

const Container = styled.div`
  min-height: 150%;
`;

const DropZone = styled.div`
  border: 3px dashed;
  border-color: ${() => theme.colors.primary};
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-direction: column;
  & > * {
    transform: ${({ isAccepting }) => isAccepting && "scale(1.5)"};
    opacity: ${({ isAccepting }) => isAccepting && 0.3};
  }
  & > p {
    font-weight: bold;
    color: ${() => theme.colors.primary};
  }
`;

const FileList = styled.div`
  margin: 1rem 0 0 0;
  border: 2px solid black;
  border-radius: 5px;
  min-height: 3rem;
  position: relative;
`;

const FileListTitle = styled.h3`
  flex: 1;
  padding-left: 1rem;
`;

const FileListHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Files = styled.div`
  transition: all;
  transform-origin: top;
  ${({ isFolded }) => {
    if (isFolded)
      return css`
        transform: scaleY(0);
        max-height: 0;
      `;
    return css`
      transform: scaleY(1);
      padding: 2rem 0 0;
      max-height: 10000px;
    `;
  }}
`;
const IconWrapper = styled.div`
  cursor: pointer;
  & > svg {
    transition: all 0.2s;
    ${({ isFolded }) => {
      if (isFolded) {
        return css`
          transform: rotate(180deg);
        `;
      }
      return css`
        transform: rotate(0deg) translateY(30%);
      `;
    }}
  }
`;
const FileUploadField = ({ formikName, setIsFileUploading, buttonEl }) => {
  const [, , helpers] = useField(formikName);
  const [files, setFiles] = useState([]);
  // const [submittedFiles, setSubmittedFiles] = useState([]); // { name: "", url: "" } =>helper.setValue 해야함
  const [isAccepting, setIsAccepting] = useState(false);
  const { isMount } = useMount();
  const [isFolded, setIsFolded] = useState(true);

  const handleUpload = useCallback(async (_file, setProgress) => {
    const {
      file: { lastModified, lastModifiedDate, name, path, size, type },
      id: currentFileId,
      url: unused,
      isSubmitted,
      error: { status, message: m },
    } = _file;
    const copiedFile = { name, lastModified, lastModifiedDate, path, size, type };

    try {
      const fileDataUrl = await readAsDataUrl(_file.file);
      const request = { file: { name, contentType: type, dataUri: fileDataUrl } };

      if (process.env.REACT_APP_ENV !== "local") {
        alert("env=local입니다.");
        console.log("request:", request);
        return { hasError: false, message: "env=local", file: copiedFile, url: "" };
      }

      const response = await axios.post("https://dogemdas2c.execute-api.ap-northeast-2.amazonaws.com/v1", request, {
        onUploadProgress: (prog) => setProgress(Math.round(prog.loaded * 100) / prog.total),
      });

      // TODO:파일 안보내질때 에러처리
      console.log(response);

      const {
        message,
        result: { url, ContentType, bucketUrl, locations },
      } = response.data;

      const setFile = (v) => {
        if (v.id === currentFileId) return { ...v, isSubmitted: true, url, fullUrl: `${bucketUrl}${locations.small}` };
        return { ...v };
      };

      setFiles((prev) => prev.map(setFile));
      return {
        hasError: false,
        message: message || "submitted",
        file: { name, lastModified, lastModifiedDate, path, size, type },
        url: `${bucketUrl}${locations.small}`,
      };
    } catch (err) {
      console.error(err.message);
      // TODO: fileUploadWithProgress error handling
      const message = err.response?.data?.error?.message || err.message || "something went wrong😅 ";
      const setFile = (v) => {
        if (v.id === currentFileId) return { ...v, isSubmitted: true, error: { status: true, message } };
        return { ...v };
      };
      setFiles((prev) => prev.map(setFile));
      return { hasError: true, message, file: { name, lastModified, lastModifiedDate, path, size, type } };
    }
  }, []);

  useEffect(() => {
    if (buttonEl.current) buttonEl.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [buttonEl, isFolded]);

  useEffect(() => {
    setIsFileUploading(true);
  }, [files, setIsFileUploading]);

  useEffect(() => {
    if (isMount) return;
    console.log(`%c state submittedFiles in FileUploadField changed`, "background-color:pink;font-size:15px;font-weight:bold;color:black");

    const isEveryFileSubmitted = files.every((v) => v.isSubmitted);
    if (isEveryFileSubmitted) setIsFileUploading(false);
    else helpers.setError("파일이 업로드중입니다.");

    const formattedFormikFile = files.map((v) => ({ name: v.name, url: v.url }));
    helpers.setValue(formattedFormikFile, true);
  }, [files, isMount, setIsFileUploading]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // TODO: 에러메시지 개선
    if (rejectedFiles.length > 0) {
      console.log(rejectedFiles);
      const rejected = rejectedFiles.map((v) => ({ name: v.file.name, errors: v.errors[0].message }));
      alert(JSON.stringify({ rejectedFiles: rejected }, null, 2));
    }
    const formedAcceptedFiles = acceptedFiles.map((file) => ({
      file,
      isSubmitted: false,
      id: uuid(),
      url: "",
      fullUrl: "",
      error: { status: false, message: "" },
    }));
    setFiles((prev) => [...prev, ...formedAcceptedFiles]);
    setIsAccepting(false);
  }, []);

  const onDragEnter = () => setIsAccepting(true);
  const onDragLeave = () => setIsAccepting(false);

  const handleValidation = (_file) => {
    if (files.find(({ file }) => file.name === _file.name && file.lastModified === _file.lastModified)) return { message: "같은 파일은 업로드불가능합니다." };
    if (_file.size >= 5000000) return { message: "파일은 최대 4.9MB까지 업로드 가능합니다." };
    if (files.length > 50) return { message: "파일은 최대 50장 업로드 가능합니다." };

    return null;
  };
  const handleDelete = useCallback(
    (id) => () => {
      setFiles((prev) => prev.filter((file) => file.id !== id));
    },
    [],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 50,
    onDrop,
    onDragEnter,
    onDragLeave,
    validator: handleValidation,
  });

  return (
    // <Template
    //   isFolded={isFolded}
    //   setIsFolded={setIsFolded}
    //   handleDelete={handleDelete}
    //   handleUpload={handleUpload}
    //   files={React.useMemo(() => files, [files])}
    //   isAccepting={isAccepting}
    //   getRootProps={getRootProps}
    //   getInputProps={getInputProps}
    // />
    <Container>
      <DropZone isAccepting={isAccepting} {...getRootProps()}>
        <input {...getInputProps()} />
        <UploadIcon fill={theme.colors.primary} width={50} height={50} />
        <p>Drag and Drop or click here to upload</p>
      </DropZone>

      {/* ListFiles */}
      <FileList>
        <FileListHeader onClick={() => setIsFolded((prev) => !prev)}>
          <FileListTitle>파일들</FileListTitle>
          <IconWrapper isFolded={isFolded}>
            <Sort width={30} height={30} />
          </IconWrapper>
        </FileListHeader>
        <Files isFolded={isFolded}>
          {files.map((file) => (
            <FileUploadWithProgress handleUpload={handleUpload} handleDelete={handleDelete} file={file} key={file.id} />
          ))}
          {files.length > 5 && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconWrapper onClick={() => setIsFolded(true)} isFolded={isFolded}>
                go Top
                <Sort width={30} height={30} />
              </IconWrapper>
            </div>
          )}
        </Files>
      </FileList>
    </Container>
  );
};
FileUploadField.propTypes = {
  buttonEl: PropTypes.shape({ current: PropTypes.object }).isRequired,
  setIsFileUploading: PropTypes.func.isRequired,
  formikName: PropTypes.string.isRequired,
};
FileUploadField.defaultProps = {};

export default FileUploadField;
