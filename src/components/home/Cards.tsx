import React, { useContext } from "react";
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
interface IProps {
  handlePlayBtnClick: (id: number) => (e: React.MouseEvent) => void;
}
const Cards: React.FC<IProps> = ({ handlePlayBtnClick }) => {
  const { worldCups } = useContext(worldCupsContext);

  return (
    <StyledCards>
      {worldCups.map((v) => (
        <Card handlePlayBtnClick={handlePlayBtnClick} key={v.id} worldCup={v} isLoading />
      ))}
    </StyledCards>
  );
};

export default Cards;
