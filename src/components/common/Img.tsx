import React, { forwardRef } from "react";
import styled from "styled-components";

interface StyledImage {
  width: number;
  height: number;
}
const StyledImage = styled.img`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  border-radius: 5px;
  font-size: 10px;
  overflow: hidden;
`;

const Img = forwardRef<HTMLImageElement, Omit<JSX.IntrinsicElements["img"], "ref">>(
  ({ ...restProps }, ref = null) => <StyledImage {...restProps} ref={ref} />,
);

export default Img;
