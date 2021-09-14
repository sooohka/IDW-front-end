import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledProgressBar = styled.div`
  background-color: #ecf0f1;
  flex: 1;
  border-radius: 10000px;
  height: 3rem;
  overflow: hidden;
`;

const Progress = styled.div`
  background: ${({ submitted }) => (submitted ? "rebeccapurple" : "red")};
  height: 100%;
  /* width: "80%"; */
  border-radius: 10000px;
  width: ${({ progress }) => (progress ? `${progress.toString()}%` : "0%")};
`;

const ProgressBar = ({ progress, submitted }) => {
  return (
    <StyledProgressBar>
      <Progress submitted={submitted} progress={progress}></Progress>
    </StyledProgressBar>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  submitted: PropTypes.bool.isRequired,
};
export default ProgressBar;
