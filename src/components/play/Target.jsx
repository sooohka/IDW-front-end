import React, { useRef } from "react";
import PropTypes from "prop-types";
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

const Target = ({ target }) => {
  const {
    id,
    name,
    likeCounts,
    image: { small, big, lowQuality: lowQualityImage, originalQuality: originalImage, id: imageId },
  } = target;
  const imageRef = useRef(null);
  const { imgSrc } = useImgLazyLoad(imageRef, big, lowQualityImage);

  return (
    <Container>
      <Img width="600px" height="750px" ref={imageRef} src={imgSrc} alt={name} />
      <InfoContainer />
    </Container>
  );
};

Target.propTypes = {
  target: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    likeCounts: PropTypes.number.isRequired,
    image: PropTypes.shape({
      small: PropTypes.string.isRequired,
      big: PropTypes.string.isRequired,
      lowQuality: PropTypes.string.isRequired,
      originalQuality: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};
export default Target;
