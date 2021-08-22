import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Wrapper = () => {
  return (
    <Container>
      <Navbar />
      <Sidebar />
      <Content />
    </Container>
  );
};

export default Wrapper;
