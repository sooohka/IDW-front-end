import React, { useLayoutEffect, useRef, useState } from "react";
import { ReactComponent as Sort } from "../../../../../assets/icons/sort-up-solid.svg";
import Text from "../../../../common/Text";
import * as S from "./Style";

const FileList: React.FC = ({ children }) => {
  const [isFolded, setIsFolded] = useState(true);
  const bottomEl = useRef<HTMLDivElement>(null);

  const handleFoldBtnClick = () => {
    setIsFolded((prev) => !prev);
  };

  useLayoutEffect(() => {
    if (isFolded) bottomEl.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    else bottomEl.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [isFolded]);

  return (
    <S.FileList>
      <S.Header onClick={handleFoldBtnClick}>
        <S.Title>파일들</S.Title>
        <S.IconWrapper isFolded={isFolded}>
          <Sort width={30} height={30} />
        </S.IconWrapper>
      </S.Header>
      <S.Files isFolded={isFolded}>
        {React.Children.count(children) === 0 ? (
          <div style={{ textAlign: "center" }}>
            <Text bold fontSize='strongBody' text='파일이 없습니다' />
          </div>
        ) : (
          children
        )}
      </S.Files>
      <div ref={bottomEl} style={{ display: "flex", justifyContent: "flex-end" }}>
        <button type='button' onClick={handleFoldBtnClick}>
          Fold
        </button>
      </div>
    </S.FileList>
  );
};

export default FileList;
