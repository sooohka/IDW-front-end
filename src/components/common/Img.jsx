import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 5px;
  font-size: 10px;
  overflow: hidden;
`;

const Img = forwardRef(({ width, height, src, alt }, ref) => {
  return <StyledImage ref={ref} src={src} alt={alt} width={width} height={height}></StyledImage>;
});

Img.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

Img.defaultProps = {
  width: "50",
  height: "50",
};

export default Img;
