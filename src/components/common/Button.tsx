import React, { forwardRef } from "react";
import styled, { css, DefaultTheme } from "styled-components";

interface StyledButton {
  size: "small" | "medium" | "large";
  color: keyof DefaultTheme["colors"];
  backgroundColor: keyof DefaultTheme["colors"];
}

const StyledButton = styled.button<StyledButton>`
  border: none;
  border-radius: 5rem;
  text-transform: capitalize;
  min-width: 7rem;
  ${({ size }) => {
    switch (size) {
      case "small":
        return css`
          padding: 0.7rem 1.4rem;
          font-size: ${({ theme }) => theme.fonts.helperText};
        `;
      case "medium":
        return css`
          padding: 0.7rem 1.4rem;
          font-size: ${({ theme }) => theme.fonts.body};
        `;
      case "large":
        return css`
          font-size: ${({ theme }) => theme.fonts.label};
          padding: 1rem 2rem;
        `;
      default:
        return css``;
    }
  }}
  color: ${({ color, theme }) => theme.colors[color]};
  font-weight: bold;
  background-color: ${({ backgroundColor, theme }) => theme.colors[backgroundColor]};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    opacity: 1;
    cursor: default;
  }
`;

interface IProps {
  label: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  backgroundColor?: keyof DefaultTheme["colors"];
  color?: keyof DefaultTheme["colors"];
  onClick?: () => void;
}

const Button = forwardRef<HTMLButtonElement, IProps>(
  (
    {
      onClick,
      label,
      backgroundColor = "secondary",
      color = "white",
      type,
      disabled = false,
      size = "large",
    },
    ref,
  ) => (
    <StyledButton
      onClick={onClick}
      backgroundColor={backgroundColor}
      color={color}
      size={size}
      ref={ref}
      tabIndex={0}
      type={type}
      disabled={disabled}
    >
      {label}
    </StyledButton>
  ),
);

export default Button;
