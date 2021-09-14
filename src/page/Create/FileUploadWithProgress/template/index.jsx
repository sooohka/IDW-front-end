import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProgressBar from "../../../../components/common/ProgressBar";
import XButton from "../../../../components/common/XButton";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0 1rem 0 0;
`;

const Template = ({ submitted, progress, handleDelete }) => {
  return (
    <Container>
      <Title>fileName</Title>
      <ProgressBar submitted={submitted} progress={progress}></ProgressBar>
      <XButton onClick={handleDelete} />
    </Container>
  );
};

Template.propTypes = {
  submitted: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default Template;
