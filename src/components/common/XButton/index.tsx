import React from "react";
import * as S from "./Style";

interface IProps {
  onClick: (e: React.MouseEvent) => void;
}
const XButton: React.FC<IProps> = ({ onClick }) => (
  <S.Button onClick={onClick}>
    <S.Left />
    <S.Right />
  </S.Button>
);

export default XButton;
