import React from "react";
import styled from "styled-components";
import Navbar from "../../../components/layout/Navbar";
import CreateForm from "../CreateForm";

const Container = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  padding: 0 3rem;
`;

const Template = () => (
  <Container>
    <Navbar />
    <CreateForm />
  </Container>
);

Template.propTypes = {};

export default Template;
