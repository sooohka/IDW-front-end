import { ButtonHTMLAttributes } from "react";
import styled, { css, DefaultTheme } from "styled-components";

interface StyledButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  color?: keyof DefaultTheme["colors"];
  backgroundColor?: keyof DefaultTheme["colors"];
  children: string;
}

// eslint-disable-next-line prettier/prettier
const Button = styled.button.attrs<StyledButton,Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "children">>((props) => ({ tabIndex: 0 }))<StyledButton>`
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
  color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.primary)};
  font-weight: bold;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? theme.colors[backgroundColor] : theme.colors.primary};
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
export default Button;
