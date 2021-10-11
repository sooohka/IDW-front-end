import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import theme from "../../style/theme";

interface StyledButton {
  size: "small" | "medium" | "large";
  color: string;
  backgroundColor: string;
}

const StyledButton = styled.button<StyledButton>`
  border: none;
  border-radius: 5rem;
  text-transform: capitalize;
  min-width: 7rem;
  ${({ size, theme }) => {
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

interface IProps {
  label: string;
  children: string;
  type: "button" | "submit" | "reset" | undefined;
  disabled: boolean;
  size: "small" | "medium" | "large";
  backgroundColor: string;
  color: string;
  onClick: () => void;
}

const Button = forwardRef<HTMLButtonElement, IProps>(
  ({ onClick, label, backgroundColor = theme.colors.secondary, color = theme.colors.white, children, type, disabled, size = "large" }, ref) => (
    <StyledButton onClick={onClick} backgroundColor={backgroundColor} color={color} size={size} ref={ref} tabIndex={0} type={type} disabled={disabled}>
      {label || children}
    </StyledButton>
  ),
);

export default Button;
