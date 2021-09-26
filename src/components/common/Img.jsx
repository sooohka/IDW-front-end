import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  border-radius: 5px;
  font-size: 10px;
  overflow: hidden;
`;

const Img = forwardRef(({ src, alt, ...restProps }, ref) => <StyledImage {...restProps} ref={ref} src={src} alt={alt} />);

Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Img;
