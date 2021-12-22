import React, { useLayoutEffect, useRef, useState } from "react";
import { ReactComponent as Sort } from "../../../../../assets/icons/sort-up-solid.svg";
import useMount from "../../../../../utils/hooks/useMount";
import Text from "../../../../common/Text";
import FileUploadWithProgress from "../FileUploadWIthProgress";
import * as S from "./Style";

interface IProps {
  imageFiles: TargetFile[];
  handleDelete: (id: string) => () => void;
  setImageFiles: React.Dispatch<React.SetStateAction<TargetFile[]>>;
}

const FileList: React.FC<IProps> = ({ imageFiles, handleDelete, setImageFiles }) => {
  const [isFolded, setIsFolded] = useState(true);
  const { isMount } = useMount();
  const bottomEl = useRef<HTMLDivElement>(null);

  const handleFoldBtnClick = () => {
    setIsFolded((prev) => !prev);
  };

  useLayoutEffect(() => {
    if (isMount) return;
    if (isFolded) bottomEl.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    else bottomEl.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFolded]);

  useLayoutEffect(() => {
    if (imageFiles.length > 0) setIsFolded(false);
  }, [imageFiles]);

  return (
    <S.FileList>
      <S.Header onClick={handleFoldBtnClick}>
        <S.Title>파일들</S.Title>
        <S.IconWrapper isFolded={isFolded}>
          <Sort width={30} height={30} />
        </S.IconWrapper>
      </S.Header>
      <S.Files isFolded={isFolded}>
        {imageFiles.length !== 0 ? (
          imageFiles.map((imageFile) => (
            <FileUploadWithProgress
              imageFile={imageFile}
              key={imageFile.id}
              handleDelete={handleDelete}
              setImageFiles={setImageFiles}
            />
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            <Text bold fontSize='strongBody' text='파일이 없습니다' />
          </div>
        )}
      </S.Files>
      <div ref={bottomEl} style={{ display: "flex", justifyContent: "flex-end" }}>
        {imageFiles.length > 5 ? (
          <S.IconWrapper onClick={handleFoldBtnClick} isFolded={isFolded}>
            go Top
            <Sort width={30} height={30} />
          </S.IconWrapper>
        ) : null}
      </div>
    </S.FileList>
  );
};

export default FileList;
