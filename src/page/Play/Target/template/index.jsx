import React, { forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Img from "../../../../components/common/Img";

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
  height: 20rem;
`;

const Template = forwardRef(({ imgSrc, name, likeCounts }, ref) => (
  <Container>
    <Img width="600px" height="750px" ref={ref} src={imgSrc} alt={name} />
    <InfoContainer />
  </Container>
));

Template.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  likeCounts: PropTypes.number.isRequired,
};
export default Template;
