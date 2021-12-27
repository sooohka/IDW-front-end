import styled from "styled-components";

const Img = styled.img`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  border-radius: 5px;
  font-size: 10px;
  overflow: hidden;
`;

export default Img;
