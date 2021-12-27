import styled, { DefaultTheme } from "styled-components";

export interface StyledText {
  fontSize?: keyof DefaultTheme["fonts"];
  bold?: boolean;
  color?: keyof DefaultTheme["colors"];
  margin?: string;
}

const Text = styled.p<StyledText>`
  display: inline;
  font-size: ${({ fontSize, theme }) => (fontSize ? theme.fonts[fontSize] : theme.fonts.body)};
  font-weight: ${({ bold }) => bold && "bold"};
  color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.primary)};
  margin: ${({ margin }) => margin};
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
`;

export default Text;
