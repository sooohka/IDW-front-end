import React from "react";
import styled from "styled-components";
import Img from "../common/Img";

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
  height: 20rem;
`;
interface IProps {
  target: Target;
}
const Target: React.FC<IProps> = ({ target }) => {
  const {
    name,
    image: { big },
  } = target;

  return (
    <Container>
      <Img width={600} height={750} src={big} alt={name} />
      <InfoContainer />
    </Container>
  );
};

export default Target;
