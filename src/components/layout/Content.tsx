import React from "react";
import styled from "styled-components";

const StyledContent = styled.div`
  padding: 3rem 5rem;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface IProps {
  children: React.ReactNode;
}
const Content: React.FC<IProps> = ({ children }) => <StyledContent>{children}</StyledContent>;

export default Content;
