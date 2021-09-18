import React, { forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { theme } from "../../style/theme";

const StyledButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 1rem 2rem;
  color: ${() => theme.colors.white};
  font-size: ${() => theme.fonts.label};
  font-weight: bold;
  background-color: ${() => theme.colors.secondary};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: ${() => "gray"};
    opacity: 1;
    cursor: default;
  }
`;

const Button = forwardRef(({ label, children, type, disabled }, ref) => {
  return (
    <StyledButton ref={ref} tabIndex={0} type={type} disabled={disabled}>
      {label || children}
    </StyledButton>
  );
});

Button.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  children: "button",
  type: "submit",
  disabled: false,
};

export default Button;
