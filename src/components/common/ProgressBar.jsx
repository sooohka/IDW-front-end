import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "../../style/theme";

const StyledProgressBar = styled.div`
  position: relative;
  background-color: #ecf0f1;
  flex: 1;
  border-radius: 10000px;
  height: 3rem;
  overflow: hidden;
`;

const Title = styled.p`
  z-index: 100;
  display: inline-block;
  height: 100%;
  width: 100%;
  padding: 0 0 0 1rem;
  color: white;
  position: absolute;
  top: "50%";
  font-size: ${({ _ }) => theme.fonts.subBody};
  font-weight: bold;
`;

const Progress = styled.div`
  background: ${({ hasError }) => (hasError ? "red" : "rebeccapurple")};
  height: 100%;
  /* width: "80%"; */
  border-radius: 10000px;
  width: ${({ progress }) => (progress ? `${progress.toString()}%` : "0%")};
`;

const ProgressBar = ({ hasError, title, progress }) => {
  return (
    <StyledProgressBar>
      <Title>{title}</Title>
      <Progress hasError={hasError} progress={progress}></Progress>
    </StyledProgressBar>
  );
};

ProgressBar.propTypes = {
  title: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  hasError: PropTypes.bool.isRequired,
};
export default ProgressBar;
