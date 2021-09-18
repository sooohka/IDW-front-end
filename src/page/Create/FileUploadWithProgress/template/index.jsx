import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProgressBar from "../../../../components/common/ProgressBar";
import XButton from "../../../../components/common/XButton";
import { ReactComponent as Spinner } from "../../../../assets/icons/spinner.svg";
import { ReactComponent as FileImage } from "../../../../assets/icons/file-image-regular.svg";
import HelperText from "../../../../components/common/HelperText";
import Img from "../../../../components/common/Img";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
`;

const ProgressWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 0 1rem;
  width: 100%;
`;
const Template = ({ fileInfo, progress, handleDelete }) => {
  const {
    file: { name, url },
    isSubmitting,
    hasError,
    message,
  } = fileInfo;

  return (
    <Container onClick={(e) => e.preventDefault()}>
      {isSubmitting ? <FileImage width={50} height={50}></FileImage> : <Img src={url} alt={name}></Img>}
      <Wrapper>
        <ProgressWrapper>
          <ProgressBar title={name} hasError={hasError} progress={progress}></ProgressBar>
          {isSubmitting ? <Spinner></Spinner> : <XButton onClick={handleDelete(name)} />}
        </ProgressWrapper>
        <HelperText always hasError={hasError} text={message}></HelperText>
      </Wrapper>
    </Container>
  );
};

Template.propTypes = {
  fileInfo: PropTypes.shape({
    file: PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  progress: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default Template;
