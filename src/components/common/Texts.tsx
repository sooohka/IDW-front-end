import React from "react";
import styled from "styled-components";
import { StyledText } from "./Text";

interface StyledTexts extends StyledText {
  height: string;
  maxRows: number;
}
const StyledTexts = styled.div<StyledTexts>`
  width: 100%;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ bold }) => bold && "bold"};
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};

  height: ${({ height }) => height};

  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${({ maxRows }) => maxRows};
  -webkit-box-orient: vertical;
  overflow: hidden;

  line-height: ${({ height, maxRows }) => {
    let num = "";
    let str = "";
    const ar = Array.from(height);
    for (let i = 0; i < ar.length; i += 1) {
      if (!Number.isNaN(parseInt(ar[i], 10)) || ar[i] === ".") num += ar[i];
      else str += ar[i];
    }
    return `${parseFloat(num) / maxRows}${str}`;
  }};
`;

interface IProps {
  maxRows: number;
  height: string;
  fontSize: string;
  color: string;
  bold: boolean;
  text: string;
  margin?: string;
}
const Texts: React.FC<IProps> = ({ maxRows, height = "", fontSize, color, bold, text, margin = "0px" }) => {
  return (
    <StyledTexts margin={margin} fontSize={fontSize} color={color} bold={bold} maxRows={maxRows} height={height}>
      {text || "no text"}
    </StyledTexts>
  );
};

export default Texts;
