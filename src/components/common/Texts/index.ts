import styled from "styled-components";
import { StyledText } from "../Text";

interface StyledTexts extends StyledText {
  height: string;
  maxRows: number;
}

const Texts = styled.div<StyledTexts>`
  width: 100%;
  font-size: ${({ fontSize, theme }) => (fontSize ? theme.fonts[fontSize] : theme.fonts.body)};
  font-weight: ${({ bold }) => bold && "bold"};
  color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.primary)};
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

export default Texts;
