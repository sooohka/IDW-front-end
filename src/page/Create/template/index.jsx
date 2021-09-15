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

const Template = ({ categories }) => {
  return (
    <Container>
      <Navbar></Navbar>
      <CreateForm categories={categories}></CreateForm>
    </Container>
  );
};

Template.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })).isRequired,
};

export default Template;
