import React from "react";
import PropTypes from "prop-types";
import Template from "./template";

const Cards = ({ cards }) => {
  if (!cards) return null;
  console.log(cards);

  return <Template cards={cards}></Template>;
};

Cards.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      createDate: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      desc: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      commentCounts: PropTypes.number.isRequired,
      numberOfLikes: PropTypes.number.isRequired,
      imageDto: {
        originalImage: PropTypes.string.isRequired,
        reducedImage: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      },
    })
  ).isRequired,
};
export default Cards;
