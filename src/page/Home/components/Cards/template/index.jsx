import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "../../Card";

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  & > * {
    margin: 0 1rem 0 1rem;
  }
`;

const Template = ({ cards }) => (
  <Cards>
    {cards.map((v) => (
      <Card
        key={v.img.id}
        desc={v.desc}
        title={v.title}
        numberOfComments={v.numberOfComments}
        numberOfLikes={v.numberOfLikes}
        img={{
          src: v.img.src,
          alt: v.img.alt,
          id: v.img.id,
        }}
        isLoading
      />
    ))}
  </Cards>
);
Template.propTypes = {
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
export default Template;
