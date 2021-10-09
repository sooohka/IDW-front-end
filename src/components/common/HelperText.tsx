import React from "react";
import styled from "styled-components";

interface StyledHelperText {
  always: boolean;
  hasError: boolean;
}

const StyledHelperText = styled.p<StyledHelperText>`
  display: block;
  height: 5px;
  opacity: ${({ always, hasError }) => (hasError || always ? "1" : "0")};
  color: ${({ hasError }) => (hasError ? "red" : "green")};
  font-size: ${({ theme }) => theme.fonts.helperText};
  line-height: 1.6rem;
`;

interface IProps {
  hasError: boolean;
  text: string;
  children: string;
  always: boolean;
}

const HelperText: React.FC<IProps> = ({ hasError, children, text, always }) => (
  <StyledHelperText always={always} hasError={hasError}>
    {children || text}
  </StyledHelperText>
);

export default HelperText;
