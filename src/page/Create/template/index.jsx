import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Navbar from "../../../components/layout/Navbar";
import CreateForm from "../CreateForm";

const Container = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const Template = () => {
  return (
    <Container>
      <Navbar></Navbar>
      <CreateForm></CreateForm>
    </Container>
  );
};

Template.propTypes = {};

export default Template;
