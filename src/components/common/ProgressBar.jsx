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
  color: white;
  position: absolute;
  top: "50%";
  font-size: ${() => theme.fonts.subBody};
  font-weight: bold;
`;

const Progress = styled.div`
  background: ${({ hasError }) => (hasError ? "red" : theme.colors.secondary)};
  height: 100%;
  /* width: "80%"; */
  border-radius: 10000px;
  width: ${({ progress }) => (progress ? `${progress}%` : "0%")};
`;

const ProgressBar = ({ hasError, title, progress }) => (
  <StyledProgressBar>
    <Title>{title}</Title>
    <Progress hasError={hasError} progress={progress} />
  </StyledProgressBar>
);

ProgressBar.propTypes = {
  title: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  hasError: PropTypes.bool.isRequired,
};
export default ProgressBar;
