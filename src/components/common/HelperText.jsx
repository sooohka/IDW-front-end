import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { theme } from "../../style/theme";

const StyledHelperText = styled.p`
  display: block;
  opacity: ${({ renderSuccess, hasError }) => (renderSuccess || hasError ? "1" : "0")};
  color: ${({ hasError }) => (hasError ? "red" : "green")};
  font-size: ${({ _ }) => theme.fonts.helperText};
  margin: 0 0 0 1rem;
  line-height: 1.6rem;
`;

const HelperText = ({ hasError, children, renderSuccess }) => {
  return (
    <StyledHelperText renderSuccess={renderSuccess} hasError={hasError}>
      {children}
    </StyledHelperText>
  );
};

HelperText.propTypes = {
  hasError: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  renderSuccess: PropTypes.bool.isRequired,
};
export default HelperText;
