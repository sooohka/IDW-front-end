import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  border-radius: 5px;
  font-size: 10px;
  overflow: hidden;
`;

interface IProps {
  src: string;
  width: number;
  height: number;
  alt: string;
}
const Img = forwardRef<HTMLImageElement, IProps>(({ ...restProps }, ref) => <StyledImage {...restProps} ref={ref} />);

export default Img;
