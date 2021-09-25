import React from "react";
import styled from "styled-components";
import Navbar from "../../../components/layout/Navbar";
import CreateForm from "../CreateForm";

const Container = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const Template = () => (
  <Container>
    <Navbar />
    <CreateForm />
  </Container>
);

Template.propTypes = {};

export default Template;
