import React, { useState } from "react";
import Sort from "../../../../../assets/icons/sort-up-solid.svg";
import Text from "../../../../common/Text";
import * as S from "./Style";

const FileList: React.FC = ({ children }) => {
  const [isFolded, setIsFolded] = useState(false);

  const handleFoldBtnClick = () => {
    setIsFolded((prev) => !prev);
  };

  return (
    <S.FileList>
      <S.Header data-testid='file-list-header' onClick={handleFoldBtnClick}>
        <S.Title>파일들</S.Title>
        <S.IconWrapper isFolded={isFolded}>
          <Sort width={30} height={30} />
        </S.IconWrapper>
      </S.Header>
      {isFolded ? null : (
        <S.Files data-testid='file-list-content' isFolded={isFolded}>
          {React.Children.count(children) === 0 ? (
            <div style={{ textAlign: "center" }}>
              <Text bold fontSize='strongBody'>
                파일이 없습니다
              </Text>
            </div>
          ) : (
            children
          )}
        </S.Files>
      )}
    </S.FileList>
  );
};

export default FileList;
