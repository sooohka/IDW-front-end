import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { theme } from "../../style/theme";

const StyledButton = styled.button`
  border: none;
  border-radius: 5rem;
  text-transform: capitalize;
  min-width: 7rem;
  ${({ size }) => {
    switch (size) {
      case "small":
        return css`
          padding: 0.7rem 1.4rem;
          font-size: ${() => theme.fonts.helperText};
        `;
      case "medium":
        return css`
          padding: 0.7rem 1.4rem;
          font-size: ${() => theme.fonts.body};
        `;
      case "large":
        return css`
          font-size: ${() => theme.fonts.label};
          padding: 1rem 2rem;
        `;
      default:
        return css``;
    }
  }}
  color: ${({ color }) => color};
  font-weight: bold;
  background-color: ${({ backgroundColor }) => backgroundColor};
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

const Button = forwardRef(({ onClick, label, backgroundColor, color, children, type, disabled, size }, ref) => {
  return (
    <StyledButton onClick={onClick} backgroundColor={backgroundColor} color={color} size={size} ref={ref} tabIndex={0} type={type} disabled={disabled}>
      {label || children}
    </StyledButton>
  );
});

Button.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
  children: "button",
  type: "submit",
  disabled: false,
  size: "large",
  backgroundColor: theme.colors.secondary,
  color: theme.colors.white,
};

export default Button;
