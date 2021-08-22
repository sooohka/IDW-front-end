import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Container = styled.div`
  height: 100%;
`;

const Wrapper = () => {
  return (
    <Container>
      <Navbar />
      <Sidebar />
    </Container>
  );
};

export default Wrapper;
