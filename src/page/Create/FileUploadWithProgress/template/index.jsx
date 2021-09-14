import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProgressBar from "../../../../components/common/ProgressBar";
import XButton from "../../../../components/common/XButton";
import { theme } from "../../../../style/theme";
import { ReactComponent as Spinner } from "../../../../assets/icons/spinner.svg";

const Container = styled.div``;

const HelperText = styled.p`
  display: block;
  color: ${({ hasError }) => (hasError ? "red" : "green")};
  font-size: ${({ _ }) => theme.fonts.helperText};
  margin: 0 0 0 1rem;
  line-height: 1.6rem;
`;

const ProgressWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const Template = ({ submitResult, fileName, progress, handleDelete }) => {
  const { isSubmitting, hasError, message } = submitResult;
  return (
    <Container>
      <ProgressWrapper>
        <ProgressBar title={fileName} hasError={hasError} progress={progress}></ProgressBar>
        {isSubmitting ? <Spinner></Spinner> : <XButton onClick={handleDelete(fileName)} />}
      </ProgressWrapper>
      <HelperText hasError={hasError}>{message}</HelperText>
    </Container>
  );
};

Template.propTypes = {
  submitResult: PropTypes.shape({
    isSubmitting: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  fileName: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default Template;
