import React from "react";
import styled from "styled-components";
import theme from "../../style/theme";

export interface StyledText {
  fontSize: string;
  bold: boolean;
  color: string;
  margin: string;
}
const StyledText = styled.p<StyledText>`
  display: inline;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ bold }) => bold && "bold"};
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
`;

interface IProps {
  fontSize: string;
  color: string;
  bold: boolean;
  text: string;
  margin?: string;
}
const Text: React.FC<IProps> = ({ fontSize, color=theme.colors.primary, bold, text, margin = "0px" }) => {
  return (
    <StyledText margin={margin} fontSize={fontSize} color={color} bold={bold}>
      {text || "no text"}
    </StyledText>
  );
};

export default Text;
