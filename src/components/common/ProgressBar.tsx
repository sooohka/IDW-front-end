import React from "react";
import styled from "styled-components";

const StyledProgressBar = styled.div`
  position: relative;
  background-color: #ecf0f1;
  flex: 1;
  border-radius: 10000px;
  height: 3rem;
  max-height: 3rem;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const Title = styled.p`
  z-index: 100;
  display: inline-block;
  width: 100%;
  padding: 0 0 0 1rem;
  color: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: "50%";
  font-size: ${({ theme }) => theme.fonts.subBody};
  font-weight: bold;
`;

interface Progress {
  hasError: boolean;
  progress: number;
}
const Progress = styled.div<Progress>`
  background: ${({ hasError, theme }) => (hasError ? "red" : theme.colors.secondary)};
  height: 100%;
  /* width: "80%"; */
  border-radius: 10000px;
  width: ${({ progress }) => (progress ? `${progress}%` : "0%")};
`;

interface IProps {
  hasError: boolean;
  title: string;
  progress: number;
}
const ProgressBar: React.FC<IProps> = ({ hasError, title, progress }) => (
  <StyledProgressBar>
    <Title>{title}</Title>
    {hasError ? (
      <Progress hasError={hasError} progress={100} />
    ) : (
      <Progress hasError={hasError} progress={progress} />
    )}
  </StyledProgressBar>
);

export default ProgressBar;
