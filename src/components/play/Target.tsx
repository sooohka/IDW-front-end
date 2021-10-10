import React, { useRef } from "react";
import styled from "styled-components";
import useImgLazyLoad from "../../utils/hooks/useImgLazyLoad";
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
    image: { big, lowQuality: lowQualityImage },
  } = target;
  const imageRef = useRef(null);
  const { imgSrc } = useImgLazyLoad(imageRef, big, lowQualityImage);

  return (
    <Container>
      <Img width={600} height={750} ref={imageRef} src={imgSrc} alt={name} />

      <InfoContainer />
    </Container>
  );
};

export default Target;
