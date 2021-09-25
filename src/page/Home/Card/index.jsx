import PropTypes from "prop-types";
import React from "react";
import Template from "./template";

const Card = ({ worldCup, handlePlayBtnClick }) => {
  const { id } = worldCup;
  return <Template worldCup={worldCup} handlePlayBtnClick={handlePlayBtnClick(id)} />;
};

Card.propTypes = {
  worldCup: PropTypes.shape({
    id: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    commentCounts: PropTypes.number.isRequired,
    likeCounts: PropTypes.number.isRequired,
    createDate: PropTypes.string.isRequired,
    image: PropTypes.shape({
      small: PropTypes.string.isRequired,
      big: PropTypes.string.isRequired,
      lowQuality: PropTypes.string.isRequired,
      originalQuality: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
  handlePlayBtnClick: PropTypes.func.isRequired,
};
export default Card;
