import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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

const Template = ({ handlePlayBtnClick }) => (
  <Container>
    <Navbar />
    <Sidebar />
    <Content>
      <LevelModal />
      <Cards handlePlayBtnClick={handlePlayBtnClick} />
    </Content>
  </Container>
);

Template.propTypes = {
  handlePlayBtnClick: PropTypes.func.isRequired,
};
export default Template;
