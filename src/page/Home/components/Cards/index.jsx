import React from "react";
import PropTypes from "prop-types";
import Template from "./template";

const Cards = ({ cards }) => {
  if (!cards) return null;
  return <Template cards={cards}></Template>;
};

Cards.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      numberOfComments: PropTypes.number.isRequired,
      numberOfLikes: PropTypes.number.isRequired,
      img: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
export default Cards;
