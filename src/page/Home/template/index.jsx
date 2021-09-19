import React from "react";
import styled from "styled-components";
import Content from "../../../components/layout/Content";
import Navbar from "../../../components/layout/Navbar";
import Sidebar from "../../../components/layout/Sidebar";
import Cards from "../Cards";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Template = () => {
  return (
    <Container>
      <Navbar />
      <Sidebar></Sidebar>
      <Content>
        <Cards />
      </Content>
    </Container>
  );
};

export default Template;
