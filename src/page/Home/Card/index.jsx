import PropTypes from "prop-types";
import React, { useRef } from "react";
import useImgLazyLoad from "../../../utils/hooks/useImgLazyLoad";
import Template from "./template";

const Card = ({ worldCup, handlePlayBtnClick }) => {
  // const { id } = worldCup;
  const { id, desc, title, targets, commentCounts, likeCounts, createDate } = worldCup;
  const {
    id: targetId,
    name: targetName,
    likeCounts: targetLikeCounts,
    image: { small, big, lowQuality, originalQuality },
  } = targets[0];

  const imageRef = useRef(null);
  const { imgSrc } = useImgLazyLoad(imageRef, originalQuality, lowQuality);
  return <Template ref={imageRef} imgSrc={imgSrc} worldCup={worldCup} handlePlayBtnClick={handlePlayBtnClick(id)} />;
};

Card.propTypes = {
  worldCup: PropTypes.shape({
    id: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    commentCounts: PropTypes.number.isRequired,
    likeCounts: PropTypes.number.isRequired,
    createDate: PropTypes.string.isRequired,
    targets: PropTypes.arrayOf(
      PropTypes.shape({
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
      })
    ).isRequired,
  }).isRequired,
  handlePlayBtnClick: PropTypes.func.isRequired,
};
export default Card;
