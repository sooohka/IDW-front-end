import React from "react";
import styled from "styled-components";

interface HelperText {
  hasError: boolean;
}

const HelperText = styled.p.attrs<HelperText, React.HTMLAttributes<HTMLParagraphElement>>(
  (props) => ({ role: "note" }),
)<HelperText>`
  display: block;
  color: ${({ hasError }) => (hasError ? "red" : "green")};
  font-size: ${({ theme }) => theme.fonts.helperText};
  line-height: 1.6rem;
`;

export default HelperText;
