import React, { useContext, useRef } from "react";
import styled from "styled-components";
import GameContext from "../../utils/contexts/GameContext";
import useImgLazyLoad from "../../utils/hooks/useImgLazyLoad";
import Img from "../common/Img";
import ImgWithRef from "../common/ImgWithRef";

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
    id,
    name,
    image: { big, lowQuality },
  } = target;
  const { handleTargetClick } = useContext(GameContext);
  return (
    <Container>
      <Img onClick={handleTargetClick(id)} width={600} height={750} src={big} alt={name} />
      <InfoContainer />
      <div>{target.id}</div>
    </Container>
  );
};

export default Target;
