import React from "react";
import * as S from "./Style";

interface IProps {
  hasError: boolean;
  title: string;
  progress: number;
}
const ProgressBar: React.FC<IProps> = ({ hasError, title, progress }) => (
  <S.ProgressBar role='progressbar'>
    <S.Title>{title}</S.Title>
    {hasError ? (
      <S.Progress hasError={hasError} progress={100} />
    ) : (
      <S.Progress hasError={hasError} progress={progress} />
    )}
  </S.ProgressBar>
);

export default ProgressBar;
