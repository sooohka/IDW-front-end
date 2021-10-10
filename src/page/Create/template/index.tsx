import React from "react";
import styled from "styled-components";
import Navbar from "../../../components/layout/Navbar";
import CreateForm from "../../../components/create/CreateForm";

const Container = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  padding: 0 3rem;
`;

const Template: React.FC = () => (
  <Container>
    <Navbar />
    <CreateForm />
  </Container>
);

export default Template;
