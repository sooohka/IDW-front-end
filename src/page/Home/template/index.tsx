import React from "react";
import styled from "styled-components";
import Content from "../../../components/layout/Content";
import Navbar from "../../../components/layout/Navbar";
import Sidebar from "../../../components/layout/Sidebar";
import Cards from "../../../components/home/Cards";
import LevelModal from "../../../components/home/LevelModal";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 3rem;
`;

interface IProps {
  handlePlayBtnClick: (id: number) => (e: React.MouseEvent) => void;
  worldCups: WorldCup[];
}
const Template: React.FC<IProps> = ({ worldCups, handlePlayBtnClick }) => (
  <Container>
    <Navbar />
    <Sidebar />
    <Content>
      <LevelModal />
      <Cards worldCups={worldCups} handlePlayBtnClick={handlePlayBtnClick} />
    </Content>
  </Container>
);

export default Template;
