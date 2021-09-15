import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Template from "./template";

const Card = ({ title, desc, numberOfComments, numberOfLikes, img }) => {
  const history = useHistory();

  const handlePlayBtnClick = useCallback(
    (gameId) => (e) => {
      history.push(`/play/${gameId}`);
    },
    []
  );

  return (
    <Template handlePlayBtnClick={handlePlayBtnClick} desc={desc} img={img} numberOfComments={numberOfComments} numberOfLikes={numberOfLikes} title={title} />
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  numberOfComments: PropTypes.number.isRequired,
  numberOfLikes: PropTypes.number.isRequired,
  img: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
export default Card;
