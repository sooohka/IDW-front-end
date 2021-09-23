import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import WorldCupContext from "../../../../utils/contexts/worldCupContext";
import Card from "../../Card";

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 0 2rem 2rem 2rem;
  }
`;

const Template = ({ worldCups }) => {
  return (
    <Cards>
      {worldCups.map((v) => (
        <Card key={v.id} worldCup={v} isLoading />
      ))}
    </Cards>
  );
};

Template.propTypes = {
  worldCups: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
};
export default Template;
