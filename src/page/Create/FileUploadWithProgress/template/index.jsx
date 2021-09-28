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
const Template = ({ file, progress, handleDelete }) => {
  const {
    file: { name, lastModified, lastModifiedDate, path, size, type },
    isSubmitted,
    id,
    url,
    fullUrl,
    error: { status: errorStatus, message },
  } = file;
  // name,isSubmitted,fullUrl,error
  console.log(name, fullUrl);

  return (
    <Container onClick={(e) => e.preventDefault()}>
      {isSubmitted ? <Img width="50px" height="50px" src={fullUrl} alt={name} /> : <FileImage width={50} height={50} />}
      <Wrapper>
        <ProgressWrapper>
          <ProgressBar title={name} hasError={errorStatus} progress={progress} />
          {isSubmitted ? <XButton onClick={handleDelete} /> : <Spinner />}
        </ProgressWrapper>
        <HelperText always hasError={errorStatus} text={message} />
      </Wrapper>
    </Container>
  );
};

Template.propTypes = {
  file: PropTypes.shape({
    file: PropTypes.shape({
      name: PropTypes.string.isRequired,
      lastModified: PropTypes.number.isRequired,
      lastModifiedDate: PropTypes.instanceOf(Date).isRequired,
      path: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }),
    isSubmitted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    fullUrl: PropTypes.string.isRequired,
    error: PropTypes.shape({ status: PropTypes.bool.isRequired, message: PropTypes.string.isRequired }).isRequired,
  }).isRequired,

  progress: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default Template;
