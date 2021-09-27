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
const Template = ({ isSubmitting, fileInfo, progress, handleDelete }) => {
  const {
    file: { name, lastModified, lastModifiedDate, path, size, type },
    hasError,
    message,
    url,
  } = fileInfo;

  return (
    <Container onClick={(e) => e.preventDefault()}>
      {isSubmitting ? <FileImage width={50} height={50} /> : <Img width="50px" height="50px" src={url} alt={name} />}
      <Wrapper>
        <ProgressWrapper>
          <ProgressBar title={name} hasError={hasError} progress={progress} />
          {isSubmitting ? <Spinner /> : <XButton onClick={handleDelete(name)} />}
        </ProgressWrapper>
        <HelperText always hasError={hasError} text={message} />
      </Wrapper>
    </Container>
  );
};

Template.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  fileInfo: PropTypes.shape({
    file: PropTypes.shape({
      name: PropTypes.string.isRequired,
      lastModified: PropTypes.number.isRequired,
      lastModifiedDate: PropTypes.instanceOf(Date).isRequired,
      path: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
    hasError: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  progress: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default Template;
