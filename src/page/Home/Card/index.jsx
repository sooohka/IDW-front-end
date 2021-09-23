import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Template from "./template";

const Card = ({ worldCup }) => {
  const history = useHistory();

  const handlePlayBtnClick = useCallback((gameId) => (e) => history.push(`/play/${gameId}`), [history]);

  return <Template worldCup={worldCup} handlePlayBtnClick={handlePlayBtnClick} />;
};

Card.propTypes = {
  worldCup: PropTypes.shape({
    id: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    commentCounts: PropTypes.number.isRequired,
    likeCounts: PropTypes.number.isRequired,
    createDate: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      smallImage: PropTypes.string.isRequired,
      largeImage: PropTypes.string.isRequired,
      lowQualityImage: PropTypes.string.isRequired,
      originalImage: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};
export default Card;
