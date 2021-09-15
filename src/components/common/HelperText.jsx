import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { theme } from "../../style/theme";

const StyledHelperText = styled.p`
  opacity: ${({ always, hasError }) => (hasError || always ? "1" : "0")};
  color: ${({ hasError }) => (hasError ? "red" : "green")};
  font-size: ${() => theme.fonts.helperText};
  line-height: 1.6rem;
`;

const HelperText = ({ hasError, children, text, always }) => {
  return (
    <StyledHelperText always={always} hasError={hasError}>
      {children || text}
    </StyledHelperText>
  );
};

HelperText.propTypes = {
  hasError: PropTypes.bool.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  children: PropTypes.string,
  always: PropTypes.bool,
};
HelperText.defaultProps = {
  children: "",
  always: false,
};
export default HelperText;
