import React from "react";
import Cards from "../../../components/home/Cards";
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
      <Cards worldCups={worldCups} handlePlayBtnClick={handlePlayBtnClick} />
    </S.Content>
  </S.Container>
);

export default Template;
