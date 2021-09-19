import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Template from "./template";

const Card = ({ createDate, id, title, desc, commentCounts, likeCounts, imageDto }) => {
  const history = useHistory();

  const handlePlayBtnClick = useCallback((gameId) => (e) => history.push(`/play/${gameId}`), [history]);

  return (
    <Template
      handlePlayBtnClick={handlePlayBtnClick}
      desc={desc}
      createDate={createDate}
      id={id}
      imageDto={imageDto}
      commentCounts={commentCounts}
      likeCounts={likeCounts}
      title={title}
    />
  );
};

Card.propTypes = {
  createDate: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  commentCounts: PropTypes.number.isRequired,
  likeCounts: PropTypes.number.isRequired,
  imageDto: PropTypes.shape({
    originalImage: PropTypes.string.isRequired,
    reducedImage: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
export default Card;
