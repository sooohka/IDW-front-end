import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { theme } from "../../style/theme";

const StyledText = styled.p`
  display: inline;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ bold }) => bold && "bold"};
  color: ${({ color }) => color};
`;
const Text = ({ fontSize, color, bold, text, children }) => {
  return (
    <StyledText fontSize={fontSize} color={color} bold={bold}>
      {text || children || "no text"}
    </StyledText>
  );
};

Text.propTypes = {
  fontSize: PropTypes.string,
  color: PropTypes.string,
  bold: PropTypes.string,
  text: PropTypes.string.isRequired,
  children: PropTypes.string,
};
Text.defaultProps = {
  fontSize: theme.fonts.body,
  color: theme.colors.black,
  bold: false,
  children: null,
};
export default Text;
