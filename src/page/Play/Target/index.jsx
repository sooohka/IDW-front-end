import React, { useRef } from "react";
import PropTypes from "prop-types";
import useImgLazyLoad from "../../../utils/hooks/useImgLazyLoad";
import Template from "./template";

const Target = ({ target }) => {
  const {
    id,
    name,
    likeCounts,
    image: { small, big, lowQuality: lowQualityImage, originalQuality: originalImage, id: imageId },
  } = target;
  const imageRef = useRef(null);
  const { imgSrc } = useImgLazyLoad(imageRef, big, lowQualityImage);

  return <Template ref={imageRef} name={name} likeCounts={likeCounts} imgSrc={imgSrc} />;
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
