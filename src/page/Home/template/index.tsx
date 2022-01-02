import React from "react";
import Card from "../../../components/home/Card";
import LevelModal from "../../../components/home/LevelModal";
import Navbar from "../../../components/layout/Navbar";
import Sidebar from "../../../components/layout/Sidebar";
import * as S from "./Style";

interface IProps {
  handlePlayBtnClick: (id: number) => (e: React.MouseEvent) => void;
  worldCups: WorldCup[];
}
const Template: React.FC<IProps> = ({ worldCups, handlePlayBtnClick }) => (
  <S.Container>
    <S.Navbar>
      <Navbar />
    </S.Navbar>
    <S.Sidebar>
      <Sidebar />
    </S.Sidebar>
    <S.Content>
      <LevelModal />
      <S.Cards>
        {worldCups.map((v) => (
          <Card handlePlayBtnClick={handlePlayBtnClick} key={v.id} worldCup={v} />
        ))}
      </S.Cards>
    </S.Content>
  </S.Container>
);

export default Template;
