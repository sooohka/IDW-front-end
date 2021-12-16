import React, { useContext } from "react";
import styled from "styled-components";
import useWorldCupReducer from "../../utils/hooks/useWorldCupReducer";
import Card from "./Card";

const StyledCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 0 2rem 2rem 2rem;
  }
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
