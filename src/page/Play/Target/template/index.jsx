import React, { forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Img from "../../../../components/common/Img";

const Container = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;
const Template = forwardRef(({ imgSrc, alt }, ref) => (
  <Container>
    <Img width="90%" ref={ref} src={imgSrc} alt={alt} />
  </Container>
));

Template.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
export default Template;
