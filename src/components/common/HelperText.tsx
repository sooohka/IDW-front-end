import React from "react";
import styled from "styled-components";

interface StyledHelperText {
  hasError: boolean;
}

const StyledHelperText = styled.p<StyledHelperText>`
  display: block;
  height: 5px;
  color: ${({ hasError }) => (hasError ? "red" : "green")};
  font-size: ${({ theme }) => theme.fonts.helperText};
  line-height: 1.6rem;
`;

interface IProps {
  hasError: boolean;
  text: string;
}

const HelperText: React.FC<IProps> = ({ hasError, text }) => (
  <StyledHelperText hasError={hasError}>{text}</StyledHelperText>
);

export default HelperText;
