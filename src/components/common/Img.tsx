import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  border-radius: 5px;
  font-size: 10px;
  overflow: hidden;
`;

const Img = forwardRef<HTMLImageElement>(({ ...restProps }, ref) => <StyledImage {...restProps} ref={ref} />);

export default Img;
