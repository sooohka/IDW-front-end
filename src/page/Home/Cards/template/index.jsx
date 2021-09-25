import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "../../Card";

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 0 2rem 2rem 2rem;
  }
`;

const Template = ({ worldCups, handlePlayBtnClick }) => (
  <Cards>
    {worldCups.map((v) => (
      <Card handlePlayBtnClick={handlePlayBtnClick} key={v.id} worldCup={v} isLoading />
    ))}
  </Cards>
);

Template.propTypes = {
  handlePlayBtnClick: PropTypes.func.isRequired,
  worldCups: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
};
export default Template;
