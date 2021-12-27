import React from "react";
import styled from "styled-components";
import Card from "./Card";

const StyledCards = styled.div`
  margin: 0 auto;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 20rem);
  grid-auto-rows: 35rem;
  grid-gap: 2rem 2rem;
`;
interface IProps {
  handlePlayBtnClick: (id: number) => (e: React.MouseEvent) => void;
  worldCups: WorldCup[];
}
const Cards: React.FC<IProps> = ({ handlePlayBtnClick, worldCups }) => {
  return (
    <StyledCards>
      {worldCups.map((v) => (
        <Card handlePlayBtnClick={handlePlayBtnClick} key={v.id} worldCup={v} />
      ))}
    </StyledCards>
  );
};

export default Cards;
