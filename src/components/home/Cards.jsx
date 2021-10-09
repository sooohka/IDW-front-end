import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import worldCupsContext from "../../utils/contexts/WorldCupsContext";
import Card from "./Card";

const StyledCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 0 2rem 2rem 2rem;
  }
`;

const Cards = ({ handlePlayBtnClick }) => {
  const { worldCups } = useContext(worldCupsContext);

  return (
    <StyledCards>
      {worldCups.map((v) => (
        <Card handlePlayBtnClick={handlePlayBtnClick} key={v.id} worldCup={v} isLoading />
      ))}
    </StyledCards>
  );
};

Cards.propTypes = {
  handlePlayBtnClick: PropTypes.func.isRequired,
};

export default Cards;
