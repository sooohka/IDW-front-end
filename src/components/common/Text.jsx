import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { theme } from "../../style/theme";

const StyledText = styled.p`
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

const StyledTexts = styled.div`
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
    return `${parseFloat(num, 10) / maxRows}${str}`;
  }};
`;

const Text = ({ maxRows, height, fontSize, color, bold, text, margin, children }) => {
  if (maxRows > 1)
    return (
      <StyledTexts margin={margin} fontSize={fontSize} color={color} bold={bold} maxRows={maxRows} height={height}>
        {text || children || "no text"}
      </StyledTexts>
    );
  return (
    <StyledText margin={margin} fontSize={fontSize} color={color} bold={bold}>
      {text || children || "no text"}
    </StyledText>
  );
};

Text.propTypes = {
  fontSize: PropTypes.string,
  color: PropTypes.string,
  bold: PropTypes.bool,
  text: PropTypes.string.isRequired,
  children: PropTypes.string,
  maxRows: PropTypes.number,
  height: PropTypes.string,
  margin: PropTypes.string,
};
Text.defaultProps = {
  fontSize: theme.fonts.body,
  color: theme.colors.primary,
  bold: false,
  children: null,
  maxRows: null,
  height: null,
  margin: "0",
};
export default Text;
