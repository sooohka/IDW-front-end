import React from "react";
import styled, { DefaultTheme } from "styled-components";

export interface StyledText {
  fontSize: keyof DefaultTheme["fonts"];
  bold: boolean;
  color: keyof DefaultTheme["colors"];
  margin: string;
}

const StyledText = styled.p<StyledText>`
  display: inline;
  font-size: ${({ fontSize, theme }) => theme.fonts[fontSize]};
  font-weight: ${({ bold }) => bold && "bold"};
  color: ${({ color, theme }) => theme.colors[color]};
  margin: ${({ margin }) => margin};
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
`;

interface IProps {
  fontSize?: keyof DefaultTheme["fonts"];
  color?: keyof DefaultTheme["colors"];
  bold?: boolean;
  text: string;
  margin?: string;
}
const Text: React.FC<IProps> = ({
  fontSize = "body",
  color = "primary",
  bold = false,
  text,
  margin = "0px",
}) => {
  return (
    <StyledText margin={margin} fontSize={fontSize} color={color} bold={bold}>
      {text || "no text"}
    </StyledText>
  );
};

export default Text;
